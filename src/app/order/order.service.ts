import { Injectable } from "@angular/core";
import { CartItem } from "app/restaurants/restaurant-detail/shopping-cart/cart.item.model";
import { ShoppingCartService } from "app/restaurants/restaurant-detail/shopping-cart/shopping-cart.service";
import { Observable } from "rxjs";
import { RESTAURANT_API } from "app/app.api";
import { Order } from "./order.model";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

@Injectable()
export class OrderService {
    
    constructor(private cartService: ShoppingCartService,
                private http: HttpClient){}

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
        return this.http.post<Order>(`${RESTAURANT_API}/orders`, order)
                    .pipe(map(order => order.id))
    }

    clear(){
        this.cartService.clear()
    }
}