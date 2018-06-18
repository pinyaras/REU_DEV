import {Node} from './node';

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
        return [this.bw];
    }

}
