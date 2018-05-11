import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NodeDetailComponent } from './node-detail.component';

const routes: Routes = [
    { path: '', component: NodeDetailComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class NodeDetailRoutingModule { }
