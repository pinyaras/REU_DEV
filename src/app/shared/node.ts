
export class Node {

	id: number;
	nodeName: string;
	nodeIp: string;
	nodeMac: string;
	x: number;
	y: number;

	// {
    //     "id": 1,
    //     "nodeIp": "10.0.0.1",
    //     "nodeMac": "00:00:00:00:00:01",
    //     "nodeName": "Mesh1"
    // },

	constructor(id, name, type) { 
        this.id = id;
		this.nodeName = name;

	}
	getInfoLst() {
		return [this.nodeName, this.nodeIp, this.nodeMac];
	}
}
