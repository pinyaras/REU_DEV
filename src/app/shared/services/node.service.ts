import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/timeout';

import { RouterAP } from '../routerAP';
import { RouterNode } from '../routerNode';
import { RouterNodeDetail } from '../routerNode-detail';
import { DataJson } from '../DataJson'

@Injectable()
export class NodeService {

  constructor( private http:Http) { }

  getIwinfo():Observable<RouterNode[]> {
    return this.http.get('http://192.168.122.100/api_iwinfo/')
    .map((res:Response) => <RouterNode[]> res.json())
    .catch(this.handleErrorObservable);
  }

  getRouterDetail(id:number):Observable<DataJson[]> {
    //console.log(id);
    return this.http.get('http://192.168.122.100/api_iwinfo/'+id)
    .map((res:Response) => <DataJson[]> res.json().data_json)
    .catch(this.handleErrorObservable);
  }

  updateDB( ip:string, section:string, typeofchange:string, value:number ) {
    console.log(ip);
    return this.http.get('http://192.168.122.100/api_routers/updating/'+ip+'/'+section+'/'+typeofchange+'/'+value)
    .map((res:Response) =>  res.json())
    .catch(this.handleErrorObservable);
  }

  private handleErrorObservable (error: Response | any) {
		console.error(error.message || error);
		return Observable.throw(error.message || error);
    }



}
