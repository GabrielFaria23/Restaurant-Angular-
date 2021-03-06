import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { OrderSummaryComponent } from "./order-summary/order-summary.component";
import { MenuComponent } from "./restaurants/restaurant-detail/menu/menu.component";
import { RestaurantDetailComponent } from "./restaurants/restaurant-detail/restaurant-detail.component";
import { ReviewsComponent } from "./restaurants/restaurant-detail/reviews/reviews.component";
import { RestaurantsComponent } from "./restaurants/restaurants.component";
import { LoggedInGuard } from "./security/loggedin.guard";
import { LoginComponent } from "./security/login/login.component";

export const ROUTES: Routes = [
    {path: '', component: HomeComponent},
    {path: 'login/:to', component: LoginComponent}, //:to usado pra "eu quero que voce faça o login e depois vá para essa url"
    {path: 'login', component: LoginComponent},
    {path: 'restaurants/:id', component: RestaurantDetailComponent,
        children: [
            {path: '', redirectTo: 'menu', pathMatch: 'full'},
            {path: 'menu', component: MenuComponent},
            {path: 'reviews', component: ReviewsComponent}
        ]},
    {path: 'restaurants', component: RestaurantsComponent},
    {path: 'order', loadChildren: './order/order.module#OrderModule',
     canLoad: [LoggedInGuard], canActivate: [LoggedInGuard]},
    {path: 'order-summary', component: OrderSummaryComponent},
    {path: 'about', loadChildren: './about/about.module#AboutModule' }, //load Children -> Utilizado para fazer caarregamento tardio, geralmente em componentes pouco utilizados
    {path: '**', component: NotFoundComponent}

    //a rota ** é pra caso a url informada não seja igual a nenhuma das rotas definidas, Ela sempre tem que ficar no final porque o angular adota um metodo de processamento que a
    // a primeira rota encontrada com o nome definido vai puxar seu componenteSS
]