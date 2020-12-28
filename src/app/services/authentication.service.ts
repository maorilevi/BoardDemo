import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Card } from '../models/card.model';

@Injectable({providedIn: 'root'})
export class AuthenticationService {
  private USER_LOCAL_STORAGE_TAG = 'loginObject';
  private currentUser = new BehaviorSubject<User>(null);
  get CurrentUser(): Observable<User> {
    return this.currentUser.asObservable();
  }
  constructor(private http: HttpClient) {}
  getCurrentUserId(): string{
    return this.currentUser.getValue().id;
  }
  currentToken(): string {
    const user = this.currentUser.getValue();
    let token = null;
    if (!user) {
      const froMStorage = localStorage.getItem(this.USER_LOCAL_STORAGE_TAG);
      if (!!froMStorage) {
        const tempUser = JSON.parse(froMStorage);
        token = tempUser.token;
        this.currentUser.next(tempUser);
      }
    } else {
      token = user.token;
    }
    return token;
  }
  login(email: string, password: string): Observable<User> {
    return this.http.post<User>(environment.serverUrl + '/authentication/login', {
      email,
      password
    }).pipe(map((res: any) => {
      localStorage.setItem(this.USER_LOCAL_STORAGE_TAG, JSON.stringify(res));
      this.currentUser.next({
        userName: res.user.name,
        email: res.user.email,
        id: res.user.id,
        token: res.token
      });
      return res;
    }));
  }
  logout(): Observable<boolean> {
    localStorage.setItem(this.USER_LOCAL_STORAGE_TAG, '');
    this.currentUser.next(null);
    const one = new Observable<boolean>(observer => {
      observer.next(true);
      observer.complete();
    });
    return one.pipe(map(value => {
      return value;
    }));
    // return this.http.post<User>(environment.serverUrl + '/authentication/logout', null).pipe(map(res => {
    //   this.currentUser.next(null);
    //   return true;
    // }));
  }
  checkToken(): Observable<boolean> {
    return this.http.get(environment.serverUrl + '/authentication/checkToken').pipe(map(res => !!res));
  }
}
