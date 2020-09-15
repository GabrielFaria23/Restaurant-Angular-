import { Component, OnInit, Input } from '@angular/core';
import { RestaurantsComponent } from '../restaurants.component';
import { Restaurant } from './restaurant.model';

@Component({
  selector: 'mt-restaurant',
  templateUrl: './restaurant.component.html'
})
export class RestaurantComponent implements OnInit {

  @Input() restaurant: Restaurant;

  constructor() { }

  ngOnInit() {
    console.log(this.restaurant);
  }

}
