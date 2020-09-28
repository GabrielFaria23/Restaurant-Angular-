import { Injectable } from '@angular/core';
import { Restaurant } from './restaurant/restaurant.model';

import { RESTAURANT_API } from './../../app/app.api';

import { Http } from '@angular/http';
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

}