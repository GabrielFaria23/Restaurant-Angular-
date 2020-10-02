import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { PreloadAllModules, RouterModule } from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { ROUTES } from './app.routes'

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { RestaurantComponent } from './restaurants/restaurant/restaurant.component';
import { RestaurantDetailComponent } from './restaurants/restaurant-detail/restaurant-detail.component';
import { MenuComponent } from './restaurants/restaurant-detail/menu/menu.component';
import { ShoppingCartComponent } from './restaurants/restaurant-detail/shopping-cart/shopping-cart.component';
import { MenuItemComponent } from './restaurants/restaurant-detail/menu-item/menu-item.component';
import { ReviewsComponent } from './restaurants/restaurant-detail/reviews/reviews.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { SharedModule } from './shared/shared.module';
import { NotFoundComponent } from './not-found/not-found.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    RestaurantsComponent,
    RestaurantComponent,
    RestaurantDetailComponent,
    MenuComponent,
    ShoppingCartComponent,
    MenuItemComponent,
    ReviewsComponent,
    OrderSummaryComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    //FormsModule,
    //ReactiveFormsModule,
    SharedModule.forRoot(), //Com o sharedModule não precisa mais nem do Forms nem do ReactiveForms porque o shared ja exporta esses modulos
    RouterModule.forRoot(ROUTES, {preloadingStrategy: PreloadAllModules})
  ],
  providers: [ //RestaurantsService, ShoppingCartService, OrderService, -> Todos os Services foram removidos porque agora todos estão no privider dentro de CoreModule
                //isso é bom pra deixar a configuração do modulo raiz bem mais enxuta.
    {provide: LOCALE_ID, useValue: 'pt-BR'} //sempre que alguem pedir o valor LOCALE_ID informe pt-BR isso é apenas para exibir dinheiro na moeda brasileira
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


//instalar modulo de animações: 
//na pasta raiz executar -> npm install --save @angular/animations@4.0.0  //numeros no fim = versão
// depois npm install --save web-animations-js
