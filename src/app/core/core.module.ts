import { NgModule } from "@angular/core";
import { OrderService } from "app/order/order.service";
import { ShoppingCartService } from "app/restaurants/restaurant-detail/shopping-cart/shopping-cart.service";
import { RestaurantsService } from "app/restaurants/restaurants.service";

@NgModule({
    providers: [ShoppingCartService, OrderService, RestaurantsService]
})
export class CoreModule{}