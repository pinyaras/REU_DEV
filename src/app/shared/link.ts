import {Node} from './node';

export class Link {
    id: number;
    nexthopNode: string;
    bw: number;
    nodeId: number[];
    enabled: boolean;

    // {
    //     "id": 1,
    //     "nexthopNode": "10.0.1.2",
    //     "bw": 150,
    //     "nodeId": [
    //         1
    //     ]
    // },
    constructor(obj: any) {
        
        this.id = obj.id;
        this.nexthopNode = obj.nexthopNode;
        this.bw = obj.bw;
        this.nodeId = obj.nodeId;

    }
    // constructor(node1, node2, bw='', delay='') {
    // 	this.node1 = node1;
    // 	this.node2 = node2;
    // 	this.bw = bw;
    // 	this.delay = delay;
    //     this.enabled = true;
    // }

    // hasNode(n: Node) : boolean {
    //     return this.node1 == n || this.node2 == n;
    // }

    getInfoLst() {
        return [];
    }

}
