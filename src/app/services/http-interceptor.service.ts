import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthenticationService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let headers;
    const token = this.authService.currentToken();
    if (token  && req.url.indexOf('authenticate') < 0) {
      headers = req.headers.append('authorization', token);
    }
    return next.handle(
      req.clone({
        responseType: 'json', headers})
    );
  }
}
