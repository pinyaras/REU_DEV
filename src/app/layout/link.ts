import {Node} from './node';

export class Link {
    node1: Node;
    node2: Node;
    bw: string;
    delay: string;

    hasNode(n: Node) : boolean {
        return node1 == n || node2 == n;
    }
}
