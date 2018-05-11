import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NodeRoutingModule } from './node-routing.module';
import { NodeComponent } from './node.component';
//import { ApDetailComponent } from './node-detail/node-detail.component';

@NgModule({
  imports: [
    CommonModule,
    NodeRoutingModule
  ],
  declarations: [NodeComponent]
})
export class NodeModule { }
