import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from 'app/shared/messages/notification.service';
import { LoginService } from './login.service';

@Component({
  selector: 'mt-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup

  constructor(private fb: FormBuilder,
              private loginService: LoginService,
              private notificationService: NotificationService) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [Validators.required])
    })
  }

  login(){
    this.loginService.login(this.loginForm.value.email,
                            this.loginForm.value.password)
                      .subscribe(user => 
                                  this.notificationService.notify(`Bem Vindo, ${user.name}`),
                                response => //HttpErrorMessage //tipo do response
                                  this.notificationService.notify(response.error.message))
  }

}
