import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NodeService } from '../../shared/services/node.service';
import { RouterNode } from '../../shared/routerNode';

import { RouterAP } from '../../shared/routerAP';
import { DataJson } from '../../shared/DataJson';



@Component({
    selector: 'app-node',
    templateUrl: './node.component.html',
    styleUrls: ['./node.component.scss']
})
export class NodeComponent implements OnInit {

    routerAP: RouterAP[];
    routerNode: RouterNode[];
    dataJson:DataJson;

    constructor(
      private _NodeService :NodeService,
      private router : Router) { }

    ngOnInit() {
      this.getRouter();
  //  console.log("node WOrks");

     }

    getRouter() {
      this._NodeService.getIwinfo().subscribe(
        routerNode => { this.routerNode = routerNode,
        console.log(this.routerNode);
        //console.log("");
        });
    }

    onShowDetail(routerNode:RouterNode) {

  this.router.navigate(['/node', routerNode.router_id, 'router_ip', routerNode.router_ip]);
}

}
