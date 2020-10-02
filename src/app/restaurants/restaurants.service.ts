import { Injectable } from '@angular/core';
import { Restaurant } from './restaurant/restaurant.model';

import { RESTAURANT_API } from './../../app/app.api';

import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ErrorHandler } from '../app.error-handler'
import { MenuItem } from './restaurant-detail/menu-item/menu-item.model';

@Injectable()
export class RestaurantsService{
    
    constructor(private http: Http){}

    restaurants(search?: string): Observable<Restaurant[]> {
        return this.http.get(`${RESTAURANT_API}/restaurants`, {params: {q: search}}) //se utilizar um parametro tipo name: vai ter que digitar o nome inteiro pra conseguir fazer a busca 
            .map(response => response.json())                                        //corretamente, porem se colocar um parametro generico tipo 'q:' ele vai buscar em todos os atributos
            .catch(ErrorHandler.handleError)                                         //do restaurante tipo na descrição na categoria etc.
    }

    restaurantById(id: string ): Observable<Restaurant> {
        return this.http.get(`${RESTAURANT_API}/restaurants/${id}`)
        .map( response => response.json())
        .catch(ErrorHandler.handleError)
    }

    reviewsOfRestaurant(id: string): Observable<any>{
        return this.http.get(`${RESTAURANT_API}/restaurants/${id}/reviews`)
        .map(response => response.json())
        .catch(ErrorHandler.handleError)
    }

    menuOfRestaurant(id: string): Observable<MenuItem[]>{
        return this.http.get(`${RESTAURANT_API}/restaurants/${id}/menu`)
        .map(response => response.json())
        .catch(ErrorHandler.handleError)
    }

}