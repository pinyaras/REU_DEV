import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {Location} from '@angular/common';
import { ActivatedRoute, Params } from '@angular/router';


import { NodeService } from '../../shared/services/node.service';
import { RouterNodeDetail } from '../../shared/routerNode-detail';
import { DataJson } from '../../shared/DataJson';


import { Subscription } from "rxjs/Subscription";

@Component({
  selector: 'app-node-detail',
  templateUrl: './node-detail.component.html',
  styleUrls: ['./node-detail.component.scss']
})
export class NodeDetailComponent implements OnInit, OnDestroy {

  id:number;
  router_ip: string;
  //routerNodeDetail:RouterNodeDetail;
  dataJson: DataJson[];
  errorMessage:string;
  sub:Subscription;
  sub2:Subscription;
  sub3:Subscription;
  public timeoutId;

  public new_txpower;
  public selected:string;
  public current_radio:string;
  public radio_number:string;
  public set_radio:string;
  public success;


  constructor(private route: ActivatedRoute, private _NodeService:NodeService , private location:Location) { }

  ngOnInit() {
  this.sub =  this.route.params.subscribe( params => {
      this.id = params['id'];
      this.router_ip = params['router_ip'];
      //console.log(this.router_ip);
      this.getRouterDetail();
    });

  }


  setTxpower(radio){
    this.current_radio = radio ;
    this.radio_number = this.current_radio.slice(-1);
    this.set_radio = 'radio'+this.radio_number;
    alert(this.set_radio);

  }

  getRouterDetail(){
    this.sub2 = this._NodeService.getRouterDetail(this.id)
    .subscribe(dataJson => {
    this.dataJson = dataJson
    console.log(this.dataJson)

  },
    error => this.errorMessage = <any> error);
  }

  setRouterDetail(radio){
    clearTimeout(this.timeoutId);
    this.current_radio = radio ;
    this.radio_number = this.current_radio.slice(-1);
    this.set_radio = 'radio'+this.radio_number;
    //console.log(this.set_radio);
    //console.log(this.router_ip);
    //console.log(this.new_txpower);
    this.sub3 = this._NodeService.updateDB(this.router_ip, this.set_radio, 'txpower', this.new_txpower)
    .subscribe(
    data => { this.success = data;
    console.log(this.success);
    this.timeoutId = setTimeout(() => {
      this.getRouterDetail();

    },6000);
  },
    error => this.errorMessage = <any> error);
  }


  ngOnDestroy(){
    console.log('destroy');
    this.sub.unsubscribe();
    this.sub2.unsubscribe();
    this.sub3.unsubscribe();
    clearTimeout(this.timeoutId);

  }

  goBack(){
    this.location.back();
  }
}
