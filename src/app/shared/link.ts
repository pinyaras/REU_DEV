import { Node } from './node';

export class Link {
    id: number;
    nexthopNode: string;
    bw: number;
    nodeId: number[];
    enabled: boolean;

    constructor(obj: any) {
        this.id = obj.id;
        this.nexthopNode = obj.nexthopNode;
        this.bw = obj.bw;
        this.nodeId = obj.nodeId;
        this.enabled = true;
    }


    getInfoLst() {
        return [this.bw.toString()];
    }
    equals(other: Link): boolean {
        if (!other) return false;
        return this.id == other.id
            && this.nexthopNode == other.nexthopNode
            && this.bw == other.bw
            && this.nodeId[0] == other.nodeId[0]
    }
}
