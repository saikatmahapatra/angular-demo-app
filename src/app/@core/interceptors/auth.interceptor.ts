import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { LoaderService } from '../services/loader.service';
import { AppConfig } from 'src/app/@utils/const/app.config';
import { AlertService } from '../services/alert.service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authSvc: AuthService, private loader: LoaderService, private alertSvc: AlertService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const authToken = this.authSvc.getToken();
    const isMockServer = AppConfig.useMockServer;
    this.loader.show();
    //this.alertSvc.clear();
    if(authToken && !isMockServer) {
      const clonedReq = request.clone({
        setHeaders: {
          Authorization: authToken
        }
      });
      return next.handle(clonedReq).pipe(
        finalize(() => this.loader.hide()),
      );
    } else {
      return next.handle(request).pipe(
        finalize(() => this.loader.hide()),
      );
    }
  }
}
