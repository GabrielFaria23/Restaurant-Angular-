import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { ROUTES } from './app.routes'

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { RestaurantComponent } from './restaurants/restaurant/restaurant.component';
import { RestaurantsService } from './restaurants/restaurants.service';
import { RestaurantDetailComponent } from './restaurants/restaurant-detail/restaurant-detail.component';
import { MenuComponent } from './restaurants/restaurant-detail/menu/menu.component';
import { ShoppingCartComponent } from './restaurants/restaurant-detail/shopping-cart/shopping-cart.component';
import { MenuItemComponent } from './restaurants/restaurant-detail/menu-item/menu-item.component';
import { ReviewsComponent } from './restaurants/restaurant-detail/reviews/reviews.component';
import { ShoppingCartService } from './restaurants/restaurant-detail/shopping-cart/shopping-cart.service';
import { OrderComponent } from '../app/order/order.component'
import { FormsModule } from '@angular/forms';
import { InputComponent } from './shared/input/input.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    AboutComponent,
    RestaurantsComponent,
    RestaurantComponent,
    RestaurantDetailComponent,
    MenuComponent,
    ShoppingCartComponent,
    MenuItemComponent,
    ReviewsComponent,
    OrderComponent,
    InputComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [ RestaurantsService, ShoppingCartService, 
    {provide: LOCALE_ID, useValue: 'pt-BR'} //sempre que alguem pedir o valor LOCALE_ID informe pt-BR isso é apenas para exibir dinheiro na moeda brasileira
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
