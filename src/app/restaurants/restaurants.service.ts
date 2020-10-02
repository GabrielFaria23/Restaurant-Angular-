import { Injectable } from '@angular/core';
import { Restaurant } from './restaurant/restaurant.model';

import { RESTAURANT_API } from './../../app/app.api';

import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ErrorHandler } from '../app.error-handler'
import { MenuItem } from './restaurant-detail/menu-item/menu-item.model';

@Injectable()
export class RestaurantsService{
    
    constructor(private http: HttpClient){}

    restaurants(search?: string): Observable<Restaurant[]> {
        let params: HttpParams = undefined
        if(search){
            params = new HttpParams().set('q', search)
        }
        return this.http.get<Restaurant[]>(`${RESTAURANT_API}/restaurants`, {params: params}) //se utilizar um parametro tipo name: vai ter que digitar o nome inteiro pra conseguir fazer a busca 
                                                                                     //corretamente, porem se colocar um parametro generico tipo 'q:' ele vai buscar em todos os atributos
                                                                                     //do restaurante tipo na descrição na categoria etc.
    }

    restaurantById(id: string ): Observable<Restaurant> {
        return this.http.get<Restaurant>(`${RESTAURANT_API}/restaurants/${id}`)
    }

    reviewsOfRestaurant(id: string): Observable<any>{
        return this.http.get(`${RESTAURANT_API}/restaurants/${id}/reviews`)
    }

    menuOfRestaurant(id: string): Observable<MenuItem[]>{
        return this.http.get<MenuItem[]>(`${RESTAURANT_API}/restaurants/${id}/menu`)
    }

}