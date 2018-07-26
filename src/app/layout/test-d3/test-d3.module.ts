import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestD3Component } from './test-d3.component';
import { TestRoutingModule } from './test-d3-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NetworkSvgComponent } from '../network-svg/network-svg.component';
import { ColorPickerModule } from 'ngx-color-picker'
@NgModule({
  imports: [
    CommonModule,
    TestRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ColorPickerModule
  ],
  declarations: [TestD3Component, NetworkSvgComponent]
})
export class TestD3Module { }
