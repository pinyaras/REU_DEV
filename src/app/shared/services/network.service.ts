import { Injectable } from '@angular/core';
import { Network } from '../network';
import { Node } from '../node';
import { WirelessNode } from '../wirelessnode';
import { Link } from '../link';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataJson } from '../../shared/DataJson';

const httpOptions = {
	headers: new HttpHeaders({
		'Content-Type':  'application/json',
		'Authorization': 'my-auth-token'
	})
};

@Injectable()
export class NetworkService {

	constructor(private http: HttpClient) { }

	getNodes(): Observable<Node[]> {
		return this.http.get("http://52.15.133.20/node/")
		.catch(this.handleErrorObservable);
	}
	getNodeDetail(id: number): Observable<Node> {
		return this.http.get("http://52.15.133.20/node/" + id + '/')
		.catch(this.handleErrorObservable);
	}
	getWirelessNodeDetail(id: number): Observable<WirelessNode> {
		return this.http.get("http://52.15.133.20/wireless/" + id + '/')
	}
	
	getWirelessNodes(): Observable<WirelessNode[]> {
		return this.http.get("http://52.15.133.20/wireless/")
		.catch(this.handleErrorObservable);
	}
	getWirelessLinks(): Observable<Link[]> {
		return this.http.get("http://52.15.133.20/topology/")
		.catch(this.handleErrorObservable);
	}

	updateTopology(link: Link): Observable<Link> {
		return this.http.put<Link>("http://52.15.133.20/topology/" + link.id + "/", link, httpOptions);
	}

	updateNode(node: Node): Observable<Node> {
		return this.http.put<Node>("http://52.15.133.20/node/" + node.id + "/", node, httpOptions)
	}

	updateWirelessNode(wireless: WirelessNode): Observable<WirelessNode> {
		return this.http.put<WirelessNode>("http://52.15.133.20/wireless/" + wireless.node + "/", wireless, httpOptions)
	}

	deleteNode(node: Node): Observable<Node> {
		return this.http.delete("http://52.15.133.20/node/" + node.id + "/", httpOptions)
	}

	private handleErrorObservable(error: Response | any) {
		console.error(error.message || error);
		return Observable.throw(error.message || error);
	}

}
