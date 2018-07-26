import { BrowserModule } from '@angular/platform-browser';
import { Http } from '@angular/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './shared';
import { RouterAPService } from './shared/services/router-ap.service'
import { ApService } from './shared/services/ap.service'
import { NodeService } from './shared/services/node.service'
import { apiRoutersService } from './shared/services/api_routers.service'
import { apiUsersService } from './shared/services/api_users.service'
import { NetworkService } from './shared/services/network.service'
import { ControllerStatsticsService } from './shared/services/controller-statstics.service'
// import { D3Service } from 'd3-ng2-service'; // <-- import statement
import { Ng2SmartTableModule } from 'ng2-smart-table';
// import { HttpClientModule } from '@angular/common/http';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ColorPickerModule } from 'ngx-color-picker'
import { FilterPipe } from './shared/pipes/filter-pipe'
// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, '/assets/i18n/', '.json');
}

@NgModule({
    declarations: [
        AppComponent,
        FilterPipe
    ],
    exports: [ColorPickerModule],
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        Ng2SmartTableModule,
        HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        })
    ],
    providers: [AuthGuard, RouterAPService, ApService, NodeService, apiRoutersService, ColorPickerModule, apiUsersService, NetworkService, ControllerStatsticsService],
    bootstrap: [AppComponent]
})
export class AppModule { }
