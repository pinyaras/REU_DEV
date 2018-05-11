import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

//import { RouterAP} from '../routerAP';
//import { RouterAPDetail } from '../routerAP-detail';

@Injectable()
export class apiRoutersService {

  constructor( private http:Http) { }

  editRouter(InvId, manufacturer, model_no, location) {
    //console.log(id+ip+name+location);
    return this.http.get('http://192.168.122.100/api_routers/admin/updating/'+InvId+'/'+manufacturer+'/'+model_no+'/'+location)
    .map((res:Response) =>  res.text())
    .catch(this.handleErrorObservable);
  }
  addRouter(InvId, manufacturer, model_no, location) {
//    console.log(InvId)
    return this.http.get('http://192.168.122.100/api_routers/admin/create/'+InvId+'/'+manufacturer+'/'+model_no+'/'+location)
    .map((res:Response) =>  res.text())
    .catch(this.handleErrorObservable);
  }
  removeRouter(InvId) {
    console.log(InvId);
    return this.http.get('http://192.168.122.100/api_routers/admin/delete/'+InvId)
    .map((res:Response) =>  res.json())
    .catch(this.handleErrorObservable);
  }
  private handleErrorObservable (error: Response | any) {
		console.error(error.message || error);
		return Observable.throw(error.message || error);
    }


}
