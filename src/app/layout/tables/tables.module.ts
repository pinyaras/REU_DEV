import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartsModule as Ng2Charts } from 'ng2-charts';
import { TablesComponent } from './tables.component';
import { TablesRoutingModule } from './tables-routing.module';
import { PageHeaderModule } from './../../shared';

@NgModule({
    imports: [
        CommonModule,
        TablesRoutingModule,
        PageHeaderModule,
        Ng2Charts
    ],
    declarations: [TablesComponent]
})
export class TablesModule { }
