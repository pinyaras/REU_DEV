import { Injectable } from '@angular/core';
import { Network } from '../network';
import { Node } from '../node';
import { Link } from '../link';

import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
@Injectable()
export class NetworkService {

	private network: Network;

	constructor(private http: Http) {

		
		let ofNodes = this.http.get("http://52.15.133.20/node/")
				.map((res: Response) => res.text())
				.catch(function (error: Response | any) {
					console.log(error)
					return Observable.throw(error.message || error)
				});
		
		ofNodes.do(i => console.log(i));
		let mynodes = [];
		ofNodes.subscribe(data => mynodes = data);
		mynodes.forEach(function(node){
			console.log(node);
		})


		this.network = new Network();

		for (let x = 1; x < 4; x++) {
			this.network.addNode('h' + x, 'host');
		}
		this.network.addNode('s1', 'switch');
		this.network.addNode('c0', 'controller');

		let nodes = this.network.nodes;
		nodes.forEach(function (node, i) {

			nodes[i].x = Math.cos((i / nodes.length) * Math.PI * 2) * 100 + 300;
			nodes[i].y = Math.sin((i / nodes.length) * Math.PI * 2) * 100 + 200;

		})
		this.network.addLink(nodes[0], nodes[3], "15 Mbps", "10 ms");
		this.network.addLink(nodes[1], nodes[3], "30 Mbps", "5 ms");
		this.network.addLink(nodes[2], nodes[3], "5 Mbps");

	}

	getNetwork(): Observable<Network> {

		return Observable.of(this.network);

	}

}
