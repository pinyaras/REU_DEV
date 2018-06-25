import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { CommonModule } from '@angular/common';

import { NodeDetailRoutingModule } from './node-detail-routing.module';
import { NodeDetailComponent } from './node-detail.component';
//import { NodeDetailComponent } from './node-detail-detail/node-detail-detail.component';

@NgModule({
  imports: [
    CommonModule,
    NodeDetailRoutingModule,
    FormsModule
  ],
  declarations: [NodeDetailComponent]
})
export class NodeDetailModule {}
