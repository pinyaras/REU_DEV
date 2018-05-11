export class Key {

constructor(
 public ubus_rpc_session:string,
 public timeout:number,
 public expires:number,
 public acls: any,
 public data: any
) {}
}
