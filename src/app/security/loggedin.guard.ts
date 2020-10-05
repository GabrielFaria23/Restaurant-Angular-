import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, CanLoad, Route, RouterStateSnapshot } from "@angular/router";
import { LoginService } from "./login/login.service";

@Injectable()
export class LoggedInGuard implements CanLoad, CanActivate{

    constructor(private loginService: LoginService){} 

    checkAuthentication(path: string):boolean{
        const loggedIn = this.loginService.isLoggedIn()
        if(!loggedIn){
            this.loginService.handleLogin(`/${path}`)
        }
        return loggedIn
    }

    canLoad(route: Route): boolean{
        return this.checkAuthentication(route.path)
    } //canLoad é basicamente sua tradução, utiliza o metodo canLoad para verificar se pode carregar ou não uma determinada children na pagina de routes

    canActivate(activatedRoute: ActivatedRouteSnapshot, routerState: RouterStateSnapshot): boolean {
        return this.checkAuthentication(activatedRoute.routeConfig.path)
    }//mostra o front apenas quando retorna trye
}