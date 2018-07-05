
import { WirelessNode } from './wirelessnode'

export class Node {

	id: number;
	nodeName: string;
	nodeIp: string;
	nodeMac: string;
	xloc: number;
	yloc: number;
	wireless: WirelessNode[] = [];

	constructor(obj: any) {

		this.id = obj.id;
		this.nodeName = obj.nodeName;
		this.nodeIp = obj.nodeIp;
		this.nodeMac = obj.nodeMac;
		this.xloc = obj.xloc;
		this.yloc = obj.yloc;

	}
	getInfoLst() {

		return ["Node: " + this.nodeName,"Id: " + this.id,"IP: " + this.nodeIp,
		"MAC: " + this.nodeMac]
	}

	equals(other: Node): boolean {
		if (!other || other.wireless.length != this.wireless.length) return false;

		let isEqual = true;

		for(let x = 0; x < this.wireless.length; x++) {

			if(!this.wireless[x].equals(other.wireless[x])) {
				isEqual = false;
			}

		}

		return this.id == other.id
			&& this.nodeName == other.nodeName
			&& this.nodeMac == other.nodeMac
			&& this.nodeIp == other.nodeIp
			&& (isEqual);
	}
}
