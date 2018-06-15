
export class WirelessNode {

	node: number;
	intName: string;
	ipAdd: string;
	macAdd: string;
	channel: number
	power: number
	mode: string;
	bw: string
	bssid: string
	bridge: string
	x: number;
	y: number;

	constructor(obj: any) {

		this.node = obj.node;
		this.intName = obj.intName;
		this.ipAdd = obj.ipAdd;
		this.macAdd = obj.macAdd;
		this.channel = obj.channel;
		this.power = obj.power;
		this.mode = obj.mode;
		this.bw = obj.bw;
		this.bssid = obj.bssid;
		this.bridge = obj.bridge;

	}

	getInfoLst() {
		return [this.node, this.intName, this.ipAdd, this.macAdd, this.channel, this.power, this.mode, this.bw, this.bssid,
		this.bridge];
	}
}
