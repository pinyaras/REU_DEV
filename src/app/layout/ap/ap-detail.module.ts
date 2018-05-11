import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApDetailRoutingModule } from './ap-detail-routing.module';
import { ApDetailComponent } from './ap-detail.component';
//import { ApDetailComponent } from './ap-detail-detail/ap-detail-detail.component';

@NgModule({
  imports: [
    CommonModule,
    ApDetailRoutingModule
  ],
  declarations: [ApDetailComponent]
})
export class ApDetailModule { }
