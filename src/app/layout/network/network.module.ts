import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NetworkRoutingModule } from './network-routing.module';
import { NetworkComponent } from './network.component';

import { StatModule } from '../../shared';

@NgModule({
  imports: [
    CommonModule,
    NetworkRoutingModule,
    FormsModule,
    StatModule
  ],
  declarations: [NetworkComponent]
})
export class NetworkModule { }
