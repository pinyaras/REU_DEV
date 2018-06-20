import { Injectable } from '@angular/core';
import { Network } from '../network';
import { Node } from '../node';
import { WirelessNode } from '../wirelessnode';
import { Link } from '../link';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable()
export class NetworkService {

	constructor(private http: HttpClient) {
		
	}

	getNodes():Observable<Node[]>{
		 return this.http.get("http://52.15.133.20/node/")
    	.catch(this.handleErrorObservable);
	}
	getWirelessNodes():Observable<WirelessNode[]>{
		return this.http.get("http://52.15.133.20/wireless/")
    	.catch(this.handleErrorObservable);
	}
	getWirelessLinks():Observable<Link[]>{
		return this.http.get("http://52.15.133.20/topology/")
    	.catch(this.handleErrorObservable);
	}

	private handleErrorObservable (error: Response | any) {
		console.error(error.message || error);
		return Observable.throw(error.message || error);
    }

}
