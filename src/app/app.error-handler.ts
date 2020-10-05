import { HttpErrorResponse } from "@angular/common/http";
import { ErrorHandler, Injectable, Injector, NgZone } from "@angular/core";
import { LoginService } from "./security/login/login.service";
import { NotificationService } from "./shared/messages/notification.service";

@Injectable()
export class ApplicationErrorHandler extends ErrorHandler{

    constructor(private ns: NotificationService, 
                private injector: Injector,
                private zone: NgZone){
        super()
    }

    handleError(errorResponse: HttpErrorResponse | any){
        if (errorResponse instanceof HttpErrorResponse){
            const message = errorResponse.error.message
            this.zone.run(()=>{ //tem que executar o swith dentro de uma zona porque se não o angular confunde o timout das animações e não tira elas
                switch(errorResponse.status){
                    case 401:
                        this.injector.get(LoginService).handleLogin() // abre tela de login
                        break;
                    case 403:
                        this.ns.notify(message || "Não autorizado")
                        break;
                    case 404:
                        this.ns.notify(message || "Recurso não encontrado. Verifique o console para mais detalhes")
                        break;
                }
            })
        }
        super.handleError(errorResponse)
    }
}