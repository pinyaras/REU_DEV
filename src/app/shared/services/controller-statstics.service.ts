import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ControllerStatsticsService {

  private controller_url = "http://localhost:8080/";

  constructor(private http: HttpClient) { }

  getNodes(){
    return this.http.get("http://52.15.133.20/node/")
     .catch(this.handleErrorObservable);
 }
  getFlowStats(switch_no:number){
    return this.http.get(this.controller_url + "stats/flow/" + switch_no)
    	.catch(this.handleErrorObservable);
  }

  getPortStats(switch_no:number, port: number) {
    return this.http.get(this.controller_url + "stats/port/"+switch_no + "/" + port)
    	.catch(this.handleErrorObservable);
  }

  getSwitches() {
    return this.http.get(this.controller_url + "stats/switches")
    	.catch(this.handleErrorObservable);
  }
  private handleErrorObservable (error: Response | any) {
		console.error(error.message || error);
		return Observable.throw(error.message || error);
    }
}
