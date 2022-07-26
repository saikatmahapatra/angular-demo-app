import { NgModule, CUSTOM_ELEMENTS_SCHEMA, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { environment } from '../environments/environment';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './@core/core.module';
import { SharedModule } from './@shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { AuthInterceptor } from './@core/interceptors/auth.interceptor';
import { HttpErrorInterceptor } from './@core/interceptors/http-error.interceptor';
import { ConfigService } from './@core/services/config.service';
import { AppConfig } from './@utils/const/app-config';

export function init_app(configSvc: ConfigService) {
  return () => configSvc.initializeApp();
} 

export function initializeApp(
  configService: ConfigService
) {
  return async () => {
    await configService.initializeApp();
    // config.baseUrl = AppConfig.BASE_URL;
    // config.applicationGearId = CommonConfig.gearId;
    // await authService.initializePermissions();
    // userService.setUserPermissions(authService.permissions);
    // inactivityService.initialize();
  };
}

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    SharedModule,
    // Routing modules must be at the last and AppRouting Module must be the last one.
    AppRoutingModule
  ],
  exports: [BrowserAnimationsModule, PageNotFoundComponent],
  providers: [
    { provide: APP_INITIALIZER, useFactory: initializeApp, deps: [ConfigService], multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
