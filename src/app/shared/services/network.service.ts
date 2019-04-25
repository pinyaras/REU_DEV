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
	private controller_url = "http://10.69.124.129:8080/";

	constructor(private http: HttpClient) { }

	getHosts(): Observable<any> {
		return this.http.get(this.controller_url + "hosts")
			.catch(this.handleErrorObservable);
	}

	getNodes(): Observable<any> {
		return this.http.get(this.controller_url + "node/")
		.catch(this.handleErrorObservable);
	}
	getNodeDetail(id: number): Observable<any> {
		return this.http.get("http://10.69.124.129:8080/node/" + id + '/')
		.catch(this.handleErrorObservable);
	}
	getWirelessNodeDetail(id: number): Observable<any> {
		return this.http.get("http://10.69.124.129:8080/wireless/" + id + '/')
	}

	getWirelessNodes(): Observable<any> {
		return this.http.get("http://10.69.124.129:8080/wireless/")
		.catch(this.handleErrorObservable);
	}
	getWirelessLinks(): Observable<any> {
		return this.http.get("http://10.69.124.129:8080/topology/")
		.catch(this.handleErrorObservable);
	}

	updateTopology(node: Node): Observable<any> {
		return this.http.put<Node>("http://10.69.124.129:8080/node/" + node.id + "/", node, httpOptions);
	}

	updateNode(node: Node): Observable<any> {
		return this.http.put<Node>("http://10.69.124.129:8080/node/" + node.id + "/", node, httpOptions)
	}

	updateWirelessNode(wireless: WirelessNode): Observable<any> {
		return this.http.put<WirelessNode>("http://10.69.124.129:8080/wireless/" + wireless.node + "/", wireless, httpOptions)
	}

	deleteNode(node: Node): Observable<any> {
		return this.http.delete("http://10.69.124.129:8080/node/" + node.id + "/", httpOptions)
	}

	deleteLink(link: Link): Observable<any> {
		return this.http.delete("http://10.69.124.129:8080/topology/" + link.id + "/", httpOptions)
	}

	getOFBR(): Observable<any> {
		return this.http.get("http://10.69.124.129:8080/ofbr/");
	}

	private handleErrorObservable(error: Response | any) {
		console.error(error.message || error);
		return Observable.throw(error.message || error);
	}

}
