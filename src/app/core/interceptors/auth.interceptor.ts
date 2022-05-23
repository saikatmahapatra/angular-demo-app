import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authSvc: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const authToken = this.authSvc.getToken();
    if(authToken) {
      const clonedReq = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + authToken
        }
      });
      return next.handle(clonedReq);
    } else {
      return next.handle(request);
    }
  }
}
