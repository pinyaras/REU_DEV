import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { RouterAP} from '../routerAP';
import { RouterAPDetail } from '../routerAP-detail';

@Injectable()
export class ApService {


public Server: string = 'http://192.168.122.100/';
public ApiUrl: string = 'api/';
public link = this.Server + this.ApiUrl;
  url = 'http://192.168.122.100';

  constructor( private http:Http) { }

  getRouter():Observable<RouterAP[]> {
    return this.http.get('http://192.168.122.100/api/')
    .map((res:Response) => <RouterAP[]> res.json())
    .catch(this.handleErrorObservable);
  }

  getRouterDetail(id:number):Observable<RouterAPDetail> {
    console.log(id);
    return this.http.get('http://192.168.122.100/api/'+id)
    .map((res:Response) => <RouterAPDetail> res.json().data_json.values)
    .catch(this.handleErrorObservable);
  }

  private handleErrorObservable (error: Response | any) {
		console.error(error.message || error);
		return Observable.throw(error.message || error);
    }


}
