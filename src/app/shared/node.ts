
import { WirelessNode } from './wirelessnode'

export class Node {

	id: number;
	nodeName: string;
	nodeIp: string;
	nodeMac: string;
	x: number;
	y: number;
	wireless: WirelessNode;

	constructor(obj: any) {

		this.id = obj.id;
		this.nodeName = obj.nodeName;
		this.nodeIp = obj.nodeIp;
		this.nodeMac = obj.nodeMac;

	}
	getInfoLst() {
		if(this.wireless){
			return ["Node: " + this.nodeName,"Id: " + this.id,"IP: " + this.nodeIp,
			"MAC: " + this.nodeMac, "Channel: " + this.wireless.channel,
			"Power: " + this.wireless.power, "Mode: " + this.wireless.mode, "Bandwidth: " + this.wireless.bw,
			"BSSID: " + this.wireless.bssid, "Bridge: " + this.wireless.bridge];

		}else{return ["Node: " + this.nodeName,"Id: " + this.id,"IP: " + this.nodeIp,
		"MAC: " + this.nodeMac]
		}
	}

	equals(other: Node): boolean {
		if (!other) return false;
		return this.id == other.id
			&& this.nodeName == other.nodeName
			&& this.nodeMac == other.nodeMac
			&& this.nodeIp == other.nodeIp
			&& (!this.wireless || this.wireless.equals(other.wireless));
	}
}
