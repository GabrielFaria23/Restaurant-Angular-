import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RESTAURANT_API } from "app/app.api";
import { Observable } from "rxjs/Observable";
import { User } from "./user.model";

@Injectable()
export class LoginService {

    user: User
    constructor(private http:HttpClient){}

    isLoggedIn(): boolean {
        return this.user !== undefined
    }

    login(email: string, password:string): Observable<User>{
        return this.http.post<User>(`${RESTAURANT_API}/login`, 
                                {email: email, password: password})
                        .do(user => this.user = user)

    }

    //assistir aula do fim pra usar o pipe no lugar do 'do'
}