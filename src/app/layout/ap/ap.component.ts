import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ApService } from '../../shared/services/ap.service';
import { RouterAP } from '../../shared/routerAP';
import { DataJson } from '../../shared/DataJson';


@Component({
    selector: 'app-ap',
    templateUrl: './ap.component.html',
    styleUrls: ['./ap.component.scss']
})
export class APComponent implements OnInit {

    routerAP: RouterAP[];
    dataJson:DataJson;

    constructor(
      private _ApService :ApService,
      private router : Router) { }

    ngOnInit() {
      this.getRouter();

     }

    getRouter() {
      this._ApService.getRouter().subscribe(
        routerAP => { this.routerAP = routerAP,
        //console.log(this.routerAP)
        console.log("");
        });
    }

    onShowDetail(routerAP:RouterAP) {

  this.router.navigate(['/ap', routerAP.router_id, 'router_ip', routerAP.router_ip]);
}

}
