import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestD3Component } from './test-d3.component';


const routes: Routes = [
    { path: '', component: TestD3Component }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TestRoutingModule { }
