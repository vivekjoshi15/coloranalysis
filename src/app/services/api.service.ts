import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse, HttpParams, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import { userresponse, users } from '../models/users';

     
@Injectable()
export class ApiService {
  // Define the internal Subject we'll use to push the command count
  public pendingCommandsSubject = new Subject<number>();
  public pendingCommandCount = 0;

  // Provide the *public* Observable that clients can subscribe to
  public pendingCommands$: Observable<number>;

  constructor(public http: HttpClient, private inj: Injector) {
    this.pendingCommands$ = this.pendingCommandsSubject.asObservable(); 
  }

  public postAPIData(emailval: string){
    return this.http.post('/SubscribeEmails', {'subscribeEmail' : emailval})
  }

  public login(userName: string, userPassword: string, imageUrl : string) {  
    return this.http.post('/login', {'username' : userName, 'userpassword': userPassword, 'imageUrl': imageUrl});
  }

  public saveImages(filebase64: string){
    console.log(filebase64);
    return this.http.post('/saveimage', {'filebase64' : filebase64});
  }

  public getUsers(userId : string){
    return this.http.post('/getUser', { 'id': userId});
  }

  public register(_users: users){
    return this.http.post('/saveimage', {'userId' : "", 'userName': _users.userName,'userFirstName' : _users.userFirstName, 'userLastName': _users.userLastName,'userEmail' : _users.userEmail, 'userPassword': _users.userPassword,'userImageUrl': _users.userImageUrl});
  }
}