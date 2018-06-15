
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

	}

	getInfoLst() {
		return [this.intName, this.node];
	}
}
