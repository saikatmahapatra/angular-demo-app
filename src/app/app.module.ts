import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Import Shared
import { HighlightDirective } from './shared/directives/highlight.directive';
import { ExponentialStrengthPipe } from './shared/pipes/exponential-strength.pipe';
import { MaskPipe } from './shared/pipes/mask.pipe';
import { OrderByPipe } from './shared/pipes/order-by.pipe';

// Import Components
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    HighlightDirective,
    ExponentialStrengthPipe,
    MaskPipe,
    OrderByPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
