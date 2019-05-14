import { Node } from './node';
import { filter } from 'rxjs/operator/filter';

export class Link {
    id: number;
    nexthopNode: number;
    bw: number;
    nodeId: number[];
    enabled: boolean;
    active: boolean;
    byteRate: number;
    isHost: boolean;

    constructor(obj: any) {
        this.id = obj.id;
        this.isHost = obj.isHost
        this.nexthopNode = obj.nexthopNode;
        this.bw = obj.bw;
        this.nodeId = obj.node;
        this.enabled = true;
        this.active = false;
        this.byteRate = 0;
    }

    getInfoLst() {
      var data = []
        if(!this.isHost){
          data.push("PHYS: " + this.bw.toString());
        }
        // The three comes from the interval that it is refreshed at in the trestd3component
        data.push("MAC: " + this.filterUnit(this.byteRate / 3, true));
        return data;

    }
    equals(other: Link): boolean {
        if (!other) return false;
        return this.id == other.id
            && this.nexthopNode == other.nexthopNode
            && this.bw == other.bw
            && this.nodeId[0] == other.nodeId[0]
    }

    private filterUnit(count, isBytes) {
        if (isBytes) {
            count = count * 8;
        }

        if (count < 1000) {
            return count + " bps";
        }
        else if (count <= 1000000) {
            return (count / 1000).toFixed(2) + " Kbps"
        }
        else if (count <= 1000000000) {
            return (count / 1000000).toFixed(2) + " Mbps"
        }
        else {
            return (count / 1000000000).toFixed(2) + " Gbps"
        }
    };
}
