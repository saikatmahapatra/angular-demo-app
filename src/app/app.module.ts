import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppComponent } from './app.component';
import { router } from './app.router';

// Shared
// import { HighlightDirective } from './shared/highlight.directive';
// import { ExponentialStrengthPipe } from './shared/exponential-strength.pipe';
// import { MaskPipe } from './shared/mask.pipe';
// import { OrderByPipe } from './shared/order-by.pipe';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    // HighlightDirective,
    // ExponentialStrengthPipe,
    // MaskPipe,
    // OrderByPipe,
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
