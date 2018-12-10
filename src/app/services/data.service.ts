import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { users } from '../models/users';
//import { AccountService } from './account.service';

@Injectable()
export class DataService {

    // Define the internal Subject we'll use to push the command count
    public pendingCommandsSubject = new Subject<number>();
    public pendingCommandCount = 0;

    // Provide the *public* Observable that clients can subscribe to
    public pendingCommands$: Observable<number>;

    constructor(public http: HttpClient, private inj: Injector) {
        this.pendingCommands$ = this.pendingCommandsSubject.asObservable();
    }

    public getImage(url: string): Observable<any> {
        return Observable.create((observer: any) => {
            const req = new XMLHttpRequest();
            req.open('get', url);
            req.onreadystatechange = function () {
                if (req.readyState === 4 && req.status === 200) {
                    observer.next(req.response);
                    observer.complete();
                }
            };

            //req.setRequestHeader('Authorization', `Bearer ${this.inj.get(AccountService).accessToken}`);
            req.send();
        });
    }

    // public login(username: string, userpassword: string){
    //     console.log(username);
    //     return this.http.get('http://localhost:4000/login',{'userName': userName, 'userPassword': userpassword});
    // }

    public getUsers(userId: string): Observable<HttpResponse<any>>{
        console.log(userId);
        return this.http.get('https://localhost:4000/getUser/'+ userId, { observe: 'response' });
    }

   public postAPIData(emailval: string){
    return this.http.post('http://localhost:4000/SubscribeEmails', {'subscribeEmail' : emailval})
  }


    public get<T>(url: string, params?: any): Observable<T> {
        return this.http.get<T>(url, { params: this.buildUrlSearchParams(params) });
    }


    public getFull<T>(url: string): Observable<HttpResponse<T>> {
        
        return this.http.get<T>(url, { observe: 'response' });
    }

    public post<T>(url: string, data?: any, params?: any): Observable<T> {
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });        
        const expandedHeaders = this.prepareHeader(headers);
        return this.http.post<T>(url, data, expandedHeaders);
    }

    public postImage<T>(url: string, data?: any, params?: any): Observable<T> {
        let headers = new HttpHeaders({ 'Content-Type': 'undefined' });
        const expandedHeaders = this.prepareHeader(headers);
        return this.http.post<T>(url, data);
    }

    public put<T>(url: string, data?: any, params?: any): Observable<T> {
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const expandedHeaders = this.prepareHeader(headers);
        return this.http.put<T>(url, data, expandedHeaders);
    }

    public delete<T>(url: string): Observable<T> {
        return this.http.delete<T>(url);
    }

    private buildUrlSearchParams(params: any): HttpParams {
        const searchParams = new HttpParams();
        for (const key in params) {
            if (params.hasOwnProperty(key)) {
                searchParams.append(key, params[key]);
            }
        }
        return searchParams;
    }

    private prepareHeader(headers: HttpHeaders | null): object {
        headers = headers || new HttpHeaders();
        headers = headers.set('Access-Control-Allow-Origin','*');
        headers = headers.set('Content-Type', 'application/json');
        headers = headers.set('Accept', 'application/json');
        

        return {
            headers: headers
        }
    }

}