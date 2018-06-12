import { Injectable } from '@angular/core';
import { Network } from '../network';
import { Node } from '../node';
import { Link } from '../link';
import { Observable } from 'rxjs';
@Injectable()
export class NetworkService {

	private network: Network;

	constructor() { 

		this.network = new Network();

		for(let x = 1; x < 4; x++) {

			this.network.addNode('h' + x, 'host');

		}
		this.network.addNode('s1', 'switch');
		this.network.addNode('c0', 'controller');
		let nodes = this.network.nodes;
		nodes.forEach(function(node, i) {

			nodes[i].x = Math.cos((i/nodes.length)* Math.PI * 2) * 100 + 300;
  			nodes[i].y = Math.sin((i/nodes.length)* Math.PI * 2) * 100 + 200;

		}) 
		this.network.addLink(nodes[0], nodes[3]);
		this.network.addLink(nodes[1], nodes[3]);
		this.network.addLink(nodes[2], nodes[3]);

	} 

	getNetwork(): Observable<Network> {

		return Observable.of(this.network);

	}

}
