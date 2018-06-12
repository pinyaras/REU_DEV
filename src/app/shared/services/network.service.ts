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

		let nodes = this.network.nodes;
		this.network.addLink(nodes[0], nodes[1]);
		this.network.addLink(nodes[1], nodes[2]);
		this.network.addLink(nodes[0], nodes[2]);

	} 

	getNetwork(): Observable<Network> {

		return Observable.of(this.network);

	}

}
