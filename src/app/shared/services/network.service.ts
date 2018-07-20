import { Injectable } from '@angular/core';
import { Network } from '../network';
import { Node } from '../node';
import { WirelessNode } from '../wirelessnode';
import { Host } from '../host';
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

	getHosts(): Observable<any> {
		return this.http.get("http://localhost:8001/hosts")
			.catch(this.handleErrorObservable);
	}

	getNodes(): Observable<any> {
		return this.http.get("http://localhost:8001/node/")
		.catch(this.handleErrorObservable);
	}
	getNodeDetail(id: number): Observable<any> {
		return this.http.get("http://localhost:8001/node/" + id + '/')
		.catch(this.handleErrorObservable);
	}
	getWirelessNodeDetail(id: number): Observable<any> {
		return this.http.get("http://localhost:8001/wireless/" + id + '/')
	}

	getWirelessNodes(): Observable<any> {
		return this.http.get("http://localhost:8001/wireless/")
		.catch(this.handleErrorObservable);
	}
	getWirelessLinks(): Observable<any> {
		return this.http.get("http://localhost:8001/topology/")
		.catch(this.handleErrorObservable);
	}

	updateTopology(node: Node): Observable<any> {
		return this.http.put<Node>("http://localhost:8001/node/" + node.id + "/", node, httpOptions);
	}

	updateNode(node: Node): Observable<any> {
		console.log(node)
		return this.http.put<Node>("http://localhost:8001/node/" + node.id + "/", node, httpOptions)
	}

	updateWirelessNode(wireless: WirelessNode): Observable<any> {
		return this.http.put<WirelessNode>("http://localhost:8001/wireless/" + wireless.node + "/", wireless, httpOptions)
	}

	deleteNode(node: Node): Observable<any> {
		return this.http.delete("http://localhost:8001/node/" + node.id + "/", httpOptions)
	}

	deleteLink(link: Link): Observable<any> {
		return this.http.delete("http://localhost:8001/topology/" + link.id + "/", httpOptions)
	}

	private handleErrorObservable(error: Response | any) {
		console.error(error.message || error);
		return Observable.throw(error.message || error);
	}

}
