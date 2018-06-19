
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
		return [this.nodeName, this.nodeIp, this.nodeMac];
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
