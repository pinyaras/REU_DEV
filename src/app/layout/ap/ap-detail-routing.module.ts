import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApDetailComponent } from './ap-detail.component';

const routes: Routes = [
    { path: '', component: ApDetailComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ApDetailRoutingModule { }
