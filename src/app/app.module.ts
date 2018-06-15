import { BrowserModule } from '@angular/platform-browser';
import {HttpModule, Http} from '@angular/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
import { D3Service } from 'd3-ng2-service'; // <-- import statement
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { HttpClientModule } from '@angular/common/http';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: Http) {
    return new TranslateHttpLoader(http, '/assets/i18n/', '.json');
}

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        AppRoutingModule,
        Ng2SmartTableModule,
        HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [Http]
            }
        })
    ],
    providers: [AuthGuard, RouterAPService, ApService, NodeService, apiRoutersService, apiUsersService, D3Service, NetworkService],
    bootstrap: [AppComponent]
})
export class AppModule { }
