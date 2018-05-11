import { Component, OnInit } from '@angular/core';
import { RouterAPService } from '../../shared/services/router-ap.service'
import {Observable} from 'rxjs/Rx';

import { Key } from '../../shared/key'
import { ConfigAP } from '../../shared/configAP'
import { Radios } from '../../shared/radios'


@Component({
    selector: 'app-network',
    templateUrl: './network.component.html',
    styleUrls: ['./network.component.scss']
})
export class NetworkComponent implements OnInit {

    public keys: Key;
    public configsAP : ConfigAP;
    public radios : Radios;
    public editConfig;
    public res_set;
    

    constructor(private _routerAPService: RouterAPService) { }
    ngOnInit() { this.createKeys()}

    createKeys() {

    let login = {
     "jsonrpc": "2.0",
     "id": 1,
     "method": "call",
     "params":
     [ "00000000000000000000000000000000",
       "session",
       "login",
       { "username": "root", "password": "prabhu" }
     ]};

    this._routerAPService.createKey(login).subscribe(
       (keys:Key) => { this.keys = keys,
                 console.log(this.keys)
                 this.getConfig();},
       error => {
         console.error("Error!");
         return Observable.throw(error);
       }
    );
  }

  getConfig(){

  var sessionKey  = String(this.keys.ubus_rpc_session);

  let Config = { "jsonrpc": "2.0", "id": 1, "method": "call", "params": [ "", "uci", "get", {"config":"wireless"} ] }
  Config.params[0] = sessionKey;
  console.log(Config);
//  console.log(Config.params[0]);

  this._routerAPService.getConfigAP(Config).subscribe(
     (radios:Radios) => { this.radios = radios,
                               console.log(this.radios);
                               },
     error => {
       console.error("Error!");
       return Observable.throw(error);
     }
  );
}

setConfig() {
  //console.log(this.editConfig);

  var sessionKey  = String(this.keys.ubus_rpc_session);
//  let newTxpower = "10";
  let set = { "jsonrpc": "2.0", "id": 1, "method": "call", "params": [ "", "uci", "set", { "config": "wireless", "section": "radio0", "values": { "txpower": "5" } } ] }
  set.params[0] = sessionKey;
  set["params"][3]["values"]["txpower"] = this.editConfig
  //set.params[3].values.txpower = newTxpower;


  console.log(set);

  this._routerAPService.setConfigAP(set).subscribe(
     data => { this.res_set = data,
               console.log(this.res_set.result),
               this.commitConfig();
                               },
     error => {
       console.error("Error!");
       return Observable.throw(error);
     }
  );


}

commitConfig() {
  //console.log(this.editConfig);
  let res_commit;
  var sessionKey  = String(this.keys.ubus_rpc_session);
//  let newTxpower = "10";
  let commit = { "jsonrpc": "2.0", "id": 1, "method": "call", "params": [ "", "uci", "commit", {"config":"wireless"} ] }
  commit.params[0] = sessionKey;

  console.log(commit);

  this._routerAPService.setConfigAP(commit).subscribe(
     data => { res_commit = data,
               console.log(res_commit),
               this.getConfig(),
               alert("Commit");
                               },
     error => {
       console.error("Error!");
       return Observable.throw(error);
     }
  );


}


}
