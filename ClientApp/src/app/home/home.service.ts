import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pirate } from './pirate.model';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class HomeService {
    // Todo: update the api url
    strawHatsApiUrl = '';

    constructor(private http: HttpClient) {
    }

    GetAll() {
        this.http.get<Pirate[]>(this.strawHatsApiUrl)
        .subscribe(
            (res: Pirate[]) => {
                console.log(res);
            },
            err => {
                console.log(err);
            },
            () => {
                console.log('Completed');
            }
        );
    }

    /* By default, httpClient returns the body.
     * If we need to check the status code or headers then
     * we need to pass an object with observe property set to response to tell httpClient to return the response.
    */
    GetAll2() {
        this.http.get<Pirate[]>(this.strawHatsApiUrl, { observe: 'response' })
        .subscribe(
            (res) => {
                console.log(res.status);
                console.log(res.headers);
                console.log(res.body);
            },
            err => {
                console.log(err);
            }
        );
    }

}

