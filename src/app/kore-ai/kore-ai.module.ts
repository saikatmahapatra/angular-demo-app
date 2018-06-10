import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { KoreAiService } from './kore-ai.service';
import { KoreAiRoutingModule } from './kore-ai-routing.module';
import { KoreAiComponent } from './kore-ai.component';
@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    KoreAiRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [KoreAiComponent],
  providers: [KoreAiService],
  exports: [KoreAiComponent]
})
export class KoreAiModule { }
