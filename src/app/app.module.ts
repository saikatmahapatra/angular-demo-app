import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

// Import routes
import { router } from './app.router';

//Import components
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { HighlightDirective } from './highlight.directive';
import { ExponentialStrengthPipe } from './exponential-strength.pipe';
import { MaskPipe } from './mask.pipe';
import { PageComponent } from './page/page.component';
import { ErrorComponent } from './error/error.component';
import { ServicesComponent } from './page/services/services.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserComponent,    
    HighlightDirective,
    ExponentialStrengthPipe,
    MaskPipe,
    PageComponent,
    ErrorComponent,
    ServicesComponent      
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(router),
    FormsModule,
    HttpModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
