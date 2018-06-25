import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute, Params } from '@angular/router';
import { NetworkService } from '../../shared/services/network.service';
import { RouterNodeDetail } from '../../shared/routerNode-detail';
import { Subscription } from "rxjs/Subscription";
import { Node } from '../../shared/node'
import { WirelessNode } from '../../shared/wirelessnode'
import { DataJson } from '../../shared/DataJson'

@Component({
  selector: 'app-node-detail',
  templateUrl: './node-detail.component.html',
  styleUrls: ['./node-detail.component.scss']
})

export class NodeDetailComponent implements OnInit, OnDestroy {

  id:number;
  nodeIp: string;
  node: Node;
  wireless: WirelessNode;
  errorMessage:string;
  public timeoutId;
  public new_power;
  public selected:string;
  public current_radio:string;
  public radio_number:string;
  public set_radio:string;
  public success;


  constructor(private route: ActivatedRoute, private networkService:NetworkService, private location:Location) { }

  ngOnInit() {
  this.route.params.subscribe( params => {
      this.id = params['id'];
      this.nodeIp = params['nodeIp'];
      this.getRouterDetail();
    });

  }

  getRouterDetail(){
    this.networkService.getNodeDetail(this.id)
    .subscribe(data => {
        this.node = new Node(data);
      },
      error => this.errorMessage = <any> error
    );
    this.networkService.getWirelessNodeDetail(this.id).subscribe(data => {

      this.wireless = new WirelessNode(data);

    })
  }

   setDetails() {

     if(this.new_power) {
       this.wireless.power = this.new_power;
       this.networkService.updateWirelessNode(this.wireless).subscribe(data => { console.log(data) })
     }  

   }

  // setRouterDetail(radio){
  //   clearTimeout(this.timeoutId);
  //   this.current_radio = radio ;
  //   this.radio_number = this.current_radio.slice(-1);
  //   this.set_radio = 'radio'+this.radio_number;
  //   //console.log(this.set_radio);
  //   //console.log(this.router_ip);
  //   //console.log(this.new_txpower);
  //   this.networkService.updateWirelessNode(this.wireless)
  //   .subscribe(
  //   data => { this.success = data;
  //   console.log(this.success);
  //   this.timeoutId = setTimeout(() => {
  //     this.getRouterDetail();
  //   },6000);
  // },
  //   error => this.errorMessage = <any> error);
  // }


  ngOnDestroy(){
    console.log('destroy');
    clearTimeout(this.timeoutId);

  }

  goBack(){
    this.location.back();
  }
}
