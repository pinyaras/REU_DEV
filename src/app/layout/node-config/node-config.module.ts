import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2SmartTableModule, ServerDataSource } from 'ng2-smart-table';
import { Http } from '@angular/http';



import { NodeConfigRoutingModule } from './node-config-routing.module';
import { NodeConfigComponent } from './node-config.component';

@NgModule({
  imports: [
    CommonModule,
    NodeConfigRoutingModule,
    Ng2SmartTableModule
  ],
  declarations: [NodeConfigComponent]
})
export class NodeConfigModule { }
