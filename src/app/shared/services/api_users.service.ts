import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

//import { RouterAP} from '../routerAP';
//import { RouterAPDetail } from '../routerAP-detail';

@Injectable()
export class apiUsersService {

  constructor( private http:Http) { }

  updateUser( username, password, role ) {
    //console.log(id+ip+name+location);
    return this.http.get('http://192.168.122.100/api_users/admin/update/'+username+'/'+password+'/'+role)
    .map((res:Response) =>  res.json())
    .catch(this.handleErrorObservable);
  }
  addUser( username, password, role ) {
    //console.log(ip);
    return this.http.get('http://192.168.122.100/api_users/admin/create/'+username+'/'+password+'/'+role)
    .map((res:Response) =>  res.json())
    .catch(this.handleErrorObservable);
  }

  removeUser( username) {
    console.log(username);
    return this.http.get('http://192.168.122.100/api_users/admin/delete/'+username)
    .map((res:Response) =>  res.json())
    .catch(this.handleErrorObservable);
  }
  private handleErrorObservable (error: Response | any) {
		console.error(error.message || error);
		return Observable.throw(error.message || error);
    }


}
