import { Injectable } from "@angular/core";
import { CartItem } from "app/restaurants/restaurant-detail/shopping-cart/cart.item.model";
import { ShoppingCartService } from "app/restaurants/restaurant-detail/shopping-cart/shopping-cart.service";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map'
import { RESTAURANT_API } from "app/app.api";
import { Order } from "./order.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { LoginService } from "app/security/login/login.service";

@Injectable()
export class OrderService {
    
    constructor(private cartService: ShoppingCartService,
                private http: HttpClient,
                private loginService:LoginService){}

    itemsValue(): number{
        return this.cartService.total()
    }

    cartItems(): CartItem[]{
        return this.cartService.items
    }

    increaseQty(item: CartItem){
        this.cartService.increaseQty(item)
    }

    decreaseQty(item: CartItem){
        this.cartService.decreaseQty(item)
    }

    remove(item: CartItem){
        this.cartService.removeItem(item)
    }

    checkOrder(order: Order): Observable<string>{
        let headers = new HttpHeaders()
        if(this.loginService.isLoggedIn()){
            headers = headers.set('Authorization', `Bearer ${this.loginService.user.accessToken}`)
        }
        return this.http.post<Order>(`${RESTAURANT_API}/orders`, order, {headers: headers})
                    .map(order => order.id)
    }

    clear(){
        this.cartService.clear()
    }
}