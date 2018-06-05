import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { KoreAiService } from './kore-ai.service';
import { KoreAiRoutingModule } from './kore-ai-routing.module';
import { KoreAiComponent } from './kore-ai.component';
@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    KoreAiRoutingModule
  ],
  declarations: [KoreAiComponent],
  providers: [KoreAiService]
})
export class KoreAiModule { }
