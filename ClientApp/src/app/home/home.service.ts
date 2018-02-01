import { HttpClient, HttpHeaders, HttpParams, HttpRequest, HttpEventType, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pirate } from './pirate.model';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class HomeService {
    private strawHatsApiUrl = 'http://localhost:5000/api/strawhats/';
    private strawHatsUploadsApiUrl = 'http://localhost:5000/api/strawhatsUploads/';

    constructor(private http: HttpClient) {
    }

    /*
    *   All HttpClient methods returns Observable of something. 
    *   We could tell HttpClient to return Observable of our own types
    */


    // By default, httpClient returns the response body.
    GetAll() {
        this.http.get(this.strawHatsApiUrl)
            .subscribe(
            (res) => {
                console.log(res);
            },
            err => {
                console.error(err);
            });
    }

    GetAll2() {
        this.http.get<Pirate[]>(this.strawHatsApiUrl)
            .subscribe(
            (res: Pirate[]) => {
                console.log(res);
            },
            err => {
                console.error(err);
            },
            () => {
                console.log('Completed');
            });
    }

    /* 
     * If we need to check the status code or headers then
     * we need to pass an object with observe property set to 'response' to tell httpClient to return the response.
    */
    GetAll3() {        
        this.http.get<Pirate[]>(this.strawHatsApiUrl, { observe: 'response' })
            .subscribe(
            (res) => {
                console.log(res);
                console.log(res.status);
                console.log(res.body);
            },
            err => {
                console.error(err);
            });
    }

    GetById(id: number) {

        this.http.get<Pirate>(this.strawHatsApiUrl + id)
        .subscribe(
            res => {
                console.log(res);
            },
            err => {
                console.error(err);
            });
    }

    /*
    * In angular, HttpParams and HttpHeaders are immutable.
    */

    GetByIdWithParams(id: number) {               
        // This doesn't work.
        // let httpParams = new HttpParams();
        // httpParams.set("name", "somename");
        // httpParams.set("crewname", "somecrewname");
        
        // This does.
        // let httpParams = new HttpParams();
        // httpParams = httpParams.set("name", "somename");
        // httpParams = httpParams.set("crewname", "somecrewname");

        // or use chaining
        let httpParams = new HttpParams().set("name", "somename").set("crewname", "somecrewname");

        this.http.get<Pirate>(this.strawHatsApiUrl + id, { params: httpParams })
        .subscribe(
            res => {
                console.log(res);
            },
            err => {
                console.error(err);
            });
    }

    GetByIdWithHeaders(id: number) {

        let httpHeaders = new HttpHeaders().set("authorization", "myAuthKey");

        this.http.get<Pirate>(this.strawHatsApiUrl + id, { headers: httpHeaders })
        .subscribe(
            res => {
                console.log(res);
            },
            err => {
                console.error(err);
            });
    }

    Create(pirate: Pirate) {
        this.http.post(this.strawHatsApiUrl, pirate)
        .subscribe(
            res => {
                console.log(res);
            },
            err => {
                console.error(err);
            });
    }

    Update(id: number, pirate: Pirate) {
        this.http.put(this.strawHatsApiUrl + id, pirate)
        .subscribe(
            res => {
                console.log(res);
            },
            err => {
                console.error(err);
            });
    }

    Delete(id: number) {
        this.http.delete(this.strawHatsApiUrl + id)
        .subscribe(
            res => {
                console.log(res);
            },
            err => {
                console.error(err);
            });
    }

    UploadFile(file: File){
        
        const formData: FormData = new FormData();
        formData.append('myfile', file, file.name);

        // this.http.post(this.strawHatsUploadsApiUrl, formData, { reportProgress: true})
        // .subscribe(
        //     res => {
        //         console.log(res);
        //     },
        //     err => {
        //         console.error(err);
        //     }
        // );

        const request = new HttpRequest('POST', this.strawHatsUploadsApiUrl, formData, { reportProgress: true});

        this.http.request(request).subscribe(
            event => {
                if(event.type === HttpEventType.UploadProgress) {
                    console.log(event.loaded+ "/"+ event.total + " done.");
                }
                else if(event instanceof HttpResponse){
                    console.log("Upload complete.");
                }
            },
            err => {
                console.error(err);
            },
            () => {
                console.log("Upload process complete.");
            }
        );        
    }

}
