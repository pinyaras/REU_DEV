import { Component, OnInit, OnDestroy } from '@angular/core';
import {Location} from '@angular/common';
import { ActivatedRoute, Params } from '@angular/router';


import { ApService } from '../../shared/services/ap.service';
import { RouterAPDetail } from '../../shared/routerAP-detail';


import { Subscription } from "rxjs/Subscription";

@Component({
  selector: 'app-ap-detail',
  templateUrl: './ap-detail.component.html',
  styleUrls: ['./ap-detail.component.scss']
})
export class ApDetailComponent implements OnInit, OnDestroy {

  id:number;
  routerAPDetail:RouterAPDetail;
  errorMessage:string;
  sub:Subscription;
  sub2:Subscription;
  router_ip: string;

  constructor(private route: ActivatedRoute, private _ApService: ApService, private location:Location) { }

  ngOnInit() {
  this.sub =  this.route.params.subscribe( params => {
      this.id = params['id'];
      this.router_ip = params['ip'];
      console.log(this.id);
      this.getRouterDetail();
    });
  }

  getRouterDetail(){
    this.sub2 = this._ApService.getRouterDetail(this.id)
    .subscribe(routerAPDetail => {
    this.routerAPDetail = routerAPDetail,
    console.log(this.routerAPDetail)},
    error => this.errorMessage = <any> error);
  }


  ngOnDestroy(){
    console.log('destroy');
    this.sub.unsubscribe();
    this.sub2.unsubscribe();

  }

  goBack(){
    this.location.back();
  }
}
