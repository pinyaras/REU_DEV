import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { APRoutingModule } from './ap-routing.module';
import { APComponent } from './ap.component';
//import { ApDetailComponent } from './ap-detail/ap-detail.component';

@NgModule({
  imports: [
    CommonModule,
    APRoutingModule
  ],
  declarations: [APComponent]
})
export class APModule { }
