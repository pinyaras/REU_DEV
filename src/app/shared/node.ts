
import { WirelessNode } from './wirelessnode'

export class Node {

	id: number;
	nodeName: string;
	nodeIp: string;
	nodeMac: string;
	x: number;
	y: number;
	wireless: WirelessNode;

	// {
    //     "id": 1,
    //     "nodeIp": "10.0.0.1",
    //     "nodeMac": "00:00:00:00:00:01",
    //     "nodeName": "Mesh1"
    // },

	constructor(obj: any) {

        this.id = obj.id;
		this.nodeName = obj.nodeName;
		this.nodeIp = obj.nodeIp;
		this.nodeMac = obj.nodeMac;

	}
	getInfoLst() {
		return [this.nodeName, this.nodeIp, this.nodeMac];
	}
}
