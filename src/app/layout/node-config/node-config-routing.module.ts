import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { NodeConfigComponent } from './node-config.component';

const routes: Routes = [
    { path: '', component: NodeConfigComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class NodeConfigRoutingModule { }
