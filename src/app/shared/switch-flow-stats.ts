import {FlowStats} from './flow-stats';

export class SwitchFlowStats {
    id: string;
    stats: FlowStats[];

    constructor(obj: any){
        for(let x in obj){
            this.id = x;
            break;
        }
        this.stats = [];
        for(let item of obj[this.id]){
            this.stats.push(new FlowStats(item))
        }
    }
}