import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ControllerStatsticsService {

  private controller_url = "http://localhost:8080/";

  constructor(private http: HttpClient) { }

  getFlowStats(switch: number) : Observable {
    return this.http.get(this.controller_url + "stats/flow/" + number)
    	.catch(this.handleErrorObservable);
  }

  getFlowStats(switch:number, port: number) : Observable {
    return this.http.get(this.controller_url + "stats/port/"+switch + "/" + port)
    	.catch(this.handleErrorObservable);
  }
}
