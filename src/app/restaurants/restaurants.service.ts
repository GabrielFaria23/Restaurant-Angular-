import { Injectable } from '@angular/core';
import { Restaurant } from './restaurant/restaurant.model';

import { RESTAURANT_API } from './../../app/app.api';

import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ErrorHandler } from '../app.error-handler'

@Injectable()
export class RestaurantsService{
    
    constructor(private http: Http){}

    restaurants(): Observable<Restaurant[]> {
        return this.http.get(`${RESTAURANT_API}/restaurants`)
            .map(response => response.json())
            .catch(ErrorHandler.handleError)
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

}