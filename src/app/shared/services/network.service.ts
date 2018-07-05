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
		return this.http.get("http://localhost:8000/node/")
		.catch(this.handleErrorObservable);
	}
	getNodeDetail(id: number): Observable<Node> {
		return this.http.get("http://localhost:8000/node/" + id + '/')
		.catch(this.handleErrorObservable);
	}
	getWirelessNodeDetail(id: number): Observable<WirelessNode> {
		return this.http.get("http://localhost:8000/wireless/" + id + '/')
	}

	getWirelessNodes(): Observable<WirelessNode[]> {
		return this.http.get("http://localhost:8000/wireless/")
		.catch(this.handleErrorObservable);
	}
	getWirelessLinks(): Observable<Link[]> {
		return this.http.get("http://localhost:8000/topology/")
		.catch(this.handleErrorObservable);
	}

	updateTopology(node: Node): Observable<Node> {
		return this.http.put<Node>("http://localhost:8000/node/" + node.id + "/", node, httpOptions);
	}

	updateNode(node: Node): Observable<Node> {
		console.log(node)
		return this.http.put<Node>("http://localhost:8000/node/" + node.id + "/", node, httpOptions)
	}

	updateWirelessNode(wireless: WirelessNode): Observable<WirelessNode> {
		return this.http.put<WirelessNode>("http://localhost:8000/wireless/" + wireless.node + "/", wireless, httpOptions)
	}

	deleteNode(node: Node): Observable<Node> {
		return this.http.delete("http://localhost:8000/node/" + node.id + "/", httpOptions)
	}

	deleteLink(link: Link): Observable<Node> {
		return this.http.delete("http://localhost:8000/topology/" + link.id + "/", httpOptions)
	}

	private handleErrorObservable(error: Response | any) {
		console.error(error.message || error);
		return Observable.throw(error.message || error);
	}

}
