import { Node } from './node';

export class Link {
    id: number;
    nexthopNode: string;
    bw: number;
    nodeId: number[];
    xloc: number;
    yloc: number;
    enabled: boolean;

    constructor(obj: any) {
        this.id = obj.id;
        this.nexthopNode = obj.nexthopNode;
        this.bw = obj.bw;
        this.nodeId = obj.nodeId;
        this.xloc = obj.xloc;
        this.yloc = obj.yloc;
        this.enabled = true;
    }


    getInfoLst() { //Reconsider the format of "connection: node... substring(7)"
        return ["Link ID: " + this.id.toString(),"Connection: Node " + this.nodeId.toString() + ", Node " + this.nexthopNode.substring(7),
        "Bandwidth: " + this.bw.toString()];

    }
    equals(other: Link): boolean {
        if (!other) return false;
        return this.id == other.id
            && this.nexthopNode == other.nexthopNode
            && this.bw == other.bw
            && this.nodeId[0] == other.nodeId[0]
    }
}
