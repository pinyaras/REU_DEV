import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestD3Component } from './test-d3.component';
import { TestRoutingModule } from './test-d3-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NetworkSvgComponent } from '../network-svg/network-svg.component';

@NgModule({
  imports: [
    CommonModule,
    TestRoutingModule,
    FormsModule
  ],
  declarations: [TestD3Component, NetworkSvgComponent]
})
export class TestD3Module { }
