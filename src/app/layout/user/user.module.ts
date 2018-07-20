import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2SmartTableModule, ServerDataSource } from 'ng2-smart-table';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';

@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    Ng2SmartTableModule
  ],
  declarations: [UserComponent]
})
export class UserModule { }
