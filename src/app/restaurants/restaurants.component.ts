import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Restaurant } from './restaurant/restaurant.model';
import { RestaurantsService } from './restaurants.service' 

import { from, Observable } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'mt-restaurants',
  templateUrl: './restaurants.component.html',
  animations: [
    trigger('toggleSearch', [
      state('hidden', style({
        opacity: 0,
        "max-height": "0px"
      })),
      state('visible', style({
        opacity: 1,
        "max-height": "70px",
        "margin-top": "20px"
      })),
      transition('* => *', animate('250ms 0s ease-in-out'))
    ])
  ]
})
export class RestaurantsComponent implements OnInit {

  searchBarState: string = 'hidden'
  restaurants: Restaurant[]

  searchForm: FormGroup
  searchControl: FormControl

  constructor(private restaurantsService: RestaurantsService,
              private fb: FormBuilder) { }

  ngOnInit() {

    this.searchControl = this.fb.control('')
    this.searchForm = this.fb.group({
      searchControl: this.searchControl
    })
    //control.valuechanges -> utilizado para ouvir o que o usuario esta digitando em um determinado campo
    this.searchControl.valueChanges
    .pipe(
      debounceTime(500), //debouceTime so deixa emitir um evento caso a diferença de tempo entre 2 eventos for maior que a informada em ms
      distinctUntilChanged(), // so vai emitir outro evento se a busca por exemplo for diferente da busca feita enteriormente.
      switchMap(searchTerm => 
        this.restaurantsService.restaurants(searchTerm)
        .pipe(catchError(error => from([]))))
    ).subscribe(restaurants => this.restaurants = restaurants)

    this.restaurantsService.restaurants()
      .subscribe(restaurants => this.restaurants = restaurants)
    
  }

  toggleSearch(){
    this.searchBarState = this.searchBarState === 'hidden' ? 'visible' : 'hidden'
  }

}
