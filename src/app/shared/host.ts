

export class Host {

  id: number;
  clientIp: string;
  clientMac: string;
  node: number;
  xloc: number;
  yloc: number;

  constructor(obj: any) {

    this.id = obj.id;
    this.clientIp = obj.clientIp;
    this.clientMac = obj.clientMac;
    this.node = obj.node

  }

  equals(other: Host): boolean {

    return this.id == other.id && this.clientIp == other.clientIp
      && this.clientMac == other.clientMac
      && this.node == other.node;

  }

  getInfoLst() {

    return ["IP: " + this.clientIp, "MAC: " + this.clientMac]

  }

}
