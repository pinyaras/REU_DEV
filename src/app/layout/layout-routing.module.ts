import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [
            { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
            { path: 'charts', loadChildren: './charts/charts.module#ChartsModule' },
            { path: 'tables', loadChildren: './tables/tables.module#TablesModule' },
            { path: 'forms', loadChildren: './form/form.module#FormModule' },
            { path: 'bs-element', loadChildren: './bs-element/bs-element.module#BsElementModule' },
            { path: 'grid', loadChildren: './grid/grid.module#GridModule' },
            { path: 'components', loadChildren: './bs-component/bs-component.module#BsComponentModule' },
            { path: 'blank-page', loadChildren: './blank-page/blank-page.module#BlankPageModule' },
            { path: 'network', loadChildren: './network/network.module#NetworkModule' },
            { path: 'ap', loadChildren: './ap/ap.module#APModule' },
            { path: 'ap/:id/router_ip/:router_ip', loadChildren: './ap/ap-detail.module#ApDetailModule' },
            { path: 'node', loadChildren: './node/node.module#NodeModule' },
            { path: 'node/:id/router_ip/:router_ip', loadChildren: './node/node-detail.module#NodeDetailModule' },
            { path: 'node-config', loadChildren: './node-config/node-config.module#NodeConfigModule' },
            { path: 'user', loadChildren: './user/user.module#UserModule' },

        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule { }
