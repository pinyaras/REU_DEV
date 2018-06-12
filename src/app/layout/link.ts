import {Node} from './node';

export class Link {
    node1: Node;
    node2: Node;
    bw: string;
    delay: string;

    hasNode(n: Node) : boolean {
        return this.node1 == n || this.node2 == n;
    }
}
