import {Node} from './node';

export class Link {
    node1: Node;
    node2: Node;
    bw: string;
    delay: string;
    enabled: boolean;

    constructor(node1, node2, bw='', delay='') {

    	this.node1 = node1;
    	this.node2 = node2;
    	this.bw = bw;
    	this.delay = delay;
        // this.enabled = true;

    }

    hasNode(n: Node) : boolean {
        return this.node1 == n || this.node2 == n;
    }

    getInfoLst() {
        return [this.node1.name + " <--> " + this.node2.name, this.bw, this.delay]
            .filter(function(e){ return e;});
    }

}
