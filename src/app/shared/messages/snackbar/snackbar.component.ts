import { state, style, trigger, animate, transition } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/timer'
import 'rxjs/add/operator/switchMap'
import 'rxjs/add/operator/do'
import { NotificationService } from '../notification.service';

@Component({
  selector: 'mt-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.css'],
  animations: [
    trigger('snack-visibility', [
      state('hidden', style({
        opacity: 0,
        bottom: '0px'
      })),
      state('visible', style({
        opacity: 1,
        bottom: '30px'
      })),
      transition('hidden => visible', animate('500ms 0s ease-in')),
      transition('visible => hidden', animate('500ms 0s ease-out')) //duração, delay, ease-in -> acelera aparição
    ])
  ]
})
export class SnackbarComponent implements OnInit {

  message: string = 'Hello there'

  snackVisibility: string = 'hidden'

  constructor(private notificationService: NotificationService) { }

  ngOnInit() {
    this.notificationService.notifier.subscribe(message =>{ //subscribe coloca um listener no ponto desejado e so apartir desse ponto ele notifica, do permite executar uma ação no momento em que recebe a mensagem
      this.message = message
      this.snackVisibility = 'visible'
      Observable.timer(3000).subscribe(timer=> this.snackVisibility = 'hidden') // espera 3 segundos e depois some a mensagem 
    })
  }

  /*ngOnInit() {
    this.notificationService.notifier.pipe(
    tap( message => { //subscribe coloca um listener no ponto desejado e so apartir desse ponto ele notifica, do permite executar uma ação no momento em que recebe a mensagem
      this.message = message
      this.snackVisibility = 'visible'
      //Observable.timer(3000).subscribe(timer=> this.snackVisibility = 'hidden') // espera 3 segundos e depois some a mensagem 
    }),
       switchMap(message => timer(30000))
    ).subscribe(timer=> this.snackVisibility = 'hidden')
  } maneira correta, mas pipe não funciona*/

}


//swithMap troca o observable inteiro, ou seja da pra trocar os eventos que emitiria a partir do ponto