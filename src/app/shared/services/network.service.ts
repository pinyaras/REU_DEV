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
		// this.network = new Network();

		// for (let x = 1; x < 4; x++) {
		// 	this.network.addNode('h' + x, 'host');
		// }
		// this.network.addNode('s1', 'switch');
		// this.network.addNode('c0', 'controller');

		// let nodes = this.network.nodes;
		// nodes.forEach(function (node, i) {

		// 	nodes[i].x = Math.cos((i / nodes.length) * Math.PI * 2) * 100 + 300;
		// 	nodes[i].y = Math.sin((i / nodes.length) * Math.PI * 2) * 100 + 200;

		// })
		// this.network.addLink(nodes[0], nodes[3], "15 Mbps", "10 ms");
		// this.network.addLink(nodes[1], nodes[3], "30 Mbps", "5 ms");
		// this.network.addLink(nodes[2], nodes[3], "5 Mbps");
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
