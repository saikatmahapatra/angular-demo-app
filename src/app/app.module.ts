import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HighlightDirective } from './shared/directives/highlight.directive';
import { ExponentialStrengthPipe } from './shared/pipes/exponential-strength.pipe';
import { MaskPipe } from './shared/pipes/mask.pipe';
import { OrderByPipe } from './shared/pipes/order-by.pipe';
import { AppComponent } from './app.component';
import { router } from './app.router';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    HighlightDirective,
    ExponentialStrengthPipe,
    MaskPipe,
    OrderByPipe,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,    
    RouterModule.forRoot(router),
    FormsModule,
    HttpModule,
    ReactiveFormsModule,    
  ],
  providers: [],
  bootstrap: ([AppComponent])
})
export class AppModule { }
