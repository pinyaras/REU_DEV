import {Node} from './node';

export class Link {
    id: number;
    nexthopNode: string;
    bw: number;
    nodeId: number[];

    // {
    //     "id": 1,
    //     "nexthopNode": "10.0.1.2",
    //     "bw": 150,
    //     "nodeId": [
    //         1
    //     ]
    // },
    constructor(){
        
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

    // getInfoLst() {
    //     return [this.node1.name + " <--> " + this.node2.name, this.bw, this.delay]
    //         .filter(function(e){ return e;});
    // }

}
