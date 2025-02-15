import { NgModule, CUSTOM_ELEMENTS_SCHEMA, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './@core/core.module';
import { SharedModule } from './@shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { AuthInterceptor } from './@core/interceptors/auth.interceptor';
import { HttpErrorInterceptor } from './@core/interceptors/http-error.interceptor';
import { ConfigService } from './@core/services/config.service';
import { ErrorPageNotFoundComponent } from './error-page-not-found/error-page-not-found.component';
import { ErrorUnauthorizedComponent } from './error-unauthorized/error-unauthorized.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { FaqComponent } from './faq/faq.component';
import { TranslateLangModule } from './translate-language.module';

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
@NgModule({ declarations: [
        AppComponent,
        ErrorPageNotFoundComponent,
        ErrorUnauthorizedComponent,
        ErrorPageComponent,
        FaqComponent
    ],
    exports: [BrowserAnimationsModule, ErrorPageComponent, ErrorPageNotFoundComponent, ErrorUnauthorizedComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    bootstrap: [AppComponent], imports: [BrowserModule,
        BrowserAnimationsModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        CoreModule,
        SharedModule,
        TranslateLangModule,
        // Routing modules must be at the last and AppRouting Module must be the last one.
        AppRoutingModule], providers: [
        { provide: APP_INITIALIZER, useFactory: initializeApp, deps: [ConfigService], multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
        provideHttpClient(withInterceptorsFromDi()),
    ] })
export class AppModule { }
