
export class WirelessNode {


	node: number;
	intName: string;
	ipAdd: string;
	macAdd: string;
	channel: number
	power: number;
	mode: string;
	bw: string
	bssid: string
	bridge: string
	modes: string[] = ['Mesh', 'AP']

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
		return [this.node.toString(), this.intName.toString(), this.ipAdd.toString(), this.macAdd.toString(), this.channel.toString(), this.power.toString(), this.mode.toString(), this.bw.toString(), this.bssid.toString(),
		this.bridge.toString()];
	}

	equals(other: WirelessNode): boolean {
		if (!other) return false;
		return this.node == other.node
			&& this.intName == other.intName
			&& this.ipAdd == other.ipAdd
			&& this.macAdd == other.macAdd
			&& this.channel == other.channel
			&& this.power == other.power
			&& this.mode == other.mode
			&& this.bw == other.bw
			&& this.bssid == other.bssid
			&& this.bridge == other.bridge
	}
}
