import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { AlertService } from '../services/alert.service';
import { Router } from '@angular/router';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(
    private authSvc: AuthService,
    private alertSvc: AlertService,
    private router: Router
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let handled = false;
    return next.handle(request).pipe(
      catchError((returnedError) => {
        let errorMessage = null;
        if (returnedError.error instanceof ErrorEvent) {
          errorMessage = `Error: ${returnedError.error.message}`;
        } else if (returnedError instanceof HttpErrorResponse) {
          errorMessage = `Error Status ${returnedError.status}: ${returnedError.message}`;
          handled = this.handleServerSideError(returnedError);
        }
        console.error("ERROR HttpErrorInterceptor : ", errorMessage ? errorMessage : returnedError);
        if (!handled) {
          return throwError(returnedError);
        } else {
          return of(returnedError);
        }
      })
    );
  }

  private handleServerSideError(error: HttpErrorResponse): boolean {
    let handled: boolean = false;

    switch (error.status) {
      case 400:
        console.log();
        let message = error?.error?.message ? error.error.message : '<b>Sorry!</b> We\'re unable to process your request at this moment. Please try after some time.';
        this.alertSvc.error(message, false);
        handled = true;
        break;

      case 401:
        if (this.router.url != '/login') {
          this.alertSvc.error('<b>Sorry!</b> You are unauthorized to access this page. Please login again.', false);
          this.authSvc.logout();
          handled = true;
        }
        break;
        
      case 403:
        this.alertSvc.error('Please login again.', false);
        this.authSvc.logout();
        handled = true;
        break;
    }

    return handled;
  }
}
