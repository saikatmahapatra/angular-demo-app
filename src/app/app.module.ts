import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

// Import routes
import { router } from './app.router';

//Import components
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { HighlightDirective } from './highlight.directive';
import { ExponentialStrengthPipe } from './exponential-strength.pipe';
import { MaskPipe } from './mask.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserComponent,    
    HighlightDirective,
    ExponentialStrengthPipe,
    MaskPipe      
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
