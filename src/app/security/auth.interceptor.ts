import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable, Injector } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { LoginService } from "./login/login.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private injector: Injector){}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const loginService = this.injector.get(LoginService)//injector utilizado para corrigir erro de injetar dependencias

        if (loginService.isLoggedIn()){
            const authRequest = request.clone(    //chama o metodo clone porque este objeto é imutavel, não da pra fazer alterações nele com set 
                {setHeaders: {'Authorization': `Bearer ${loginService.user.accessToken}`}})
            return next.handle(authRequest)
        }else{
            return next.handle(request)
        }

    }
}