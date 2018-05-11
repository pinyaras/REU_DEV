import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';

import { Key } from '../key'
import { ConfigAP } from '../configAP'
import { Radios } from '../radios';


@Injectable()
export class RouterAPService {

public Node: string = "10.0.0.30";
public Server: string = 'http://localhost:5000/';
public ApiUrl: string = 'api/';
public ServerWithApiUrl = this.Server + this.ApiUrl;
  url = 'http://10.0.0.30/ubus';

  constructor(private http:Http) { }

  createKey(login): Observable<Key> {
    let headers = new Headers({ 'Content-Type': 'application/json','Access-Control-Allow-Origin': 'http://10.0.0.3:80/ubus' });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(login);

    return this.http.post('http://10.0.0.3/ubus', body, headers).map((res: Response) => <Key> res.json().result[1]);

  }

  getConfigAP(Config): Observable<Radios> {
    let headers = new Headers({ 'Content-Type': 'application/json','Access-Control-Allow-Origin': 'http://10.0.0.3:80/ubus' });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(Config);
    console.log(body);

    return this.http.post('http://10.0.0.3/ubus', body, headers).map((res: Response)  => <Radios> res.json().result[1].values);
  }

  setConfigAP(set) {
    let headers = new Headers({ 'Content-Type': 'application/json','Access-Control-Allow-Origin': 'http://10.0.0.3:80/ubus' });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(set);
    console.log(body);

    return this.http.post('http://10.0.0.3/ubus', body, headers).map((res: Response)  =>  res.json());
  }

  commitConfigAP(commit) {
    let headers = new Headers({ 'Content-Type': 'application/json','Access-Control-Allow-Origin': 'http://10.0.0.3:80/ubus' });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(commit);
    console.log(body);

    return this.http.post('http://10.0.0.3/ubus', body, headers).map((res: Response)  =>  res.json());
  }



}
