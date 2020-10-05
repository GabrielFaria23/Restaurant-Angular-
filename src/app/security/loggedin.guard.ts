import { Injectable } from "@angular/core";
import { CanLoad, Route } from "@angular/router";
import { LoginService } from "./login/login.service";

@Injectable()
export class LoggedInGuard implements CanLoad{

    constructor(private loginService: LoginService){} 

    canLoad(route: Route): boolean{
        const loggedIn = this.loginService.isLoggedIn()
        if(!loggedIn){
            this.loginService.handleLogin(`/${route.path}`)
        }
        return loggedIn
    } //canLoad é basicamente sua tradução, utiliza o metodo canLoad para verificar se pode carregar ou não uma determinada children na pagina de routes
}