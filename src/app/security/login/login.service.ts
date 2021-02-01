import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { RESTAURANT_API } from "app/app.api";
import { Observable } from "rxjs";
import { User } from "./user.model";
import { filter, tap } from "rxjs/operators";

@Injectable()
export class LoginService {

    user: User
    lastUrl: string
    constructor(private http:HttpClient, private router:Router){
        this.router.events.pipe(filter(e=> e instanceof NavigationEnd))
                          .subscribe((e: NavigationEnd) => this.lastUrl = e.url)
    }

    isLoggedIn(): boolean {
        return this.user !== undefined
    }

    login(email: string, password:string): Observable<User>{
        return this.http.post<User>(`${RESTAURANT_API}/login`, 
                                {email: email, password: password})
                        .pipe(tap(user => this.user = user))

    }

    handleLogin(path: string = this.lastUrl){
        console.log(path);
        
        this.router.navigate(['/login', btoa(path)])//login = pra onde ele vai, path pagina que ele vai depois que fazer o login
    }//btoa() faz o encoding da url

    logout(){
        this.user = undefined
    }

    //assistir aula do fim pra usar o pipe no lugar do 'do'
}