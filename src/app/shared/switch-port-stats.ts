import { PortStats } from './port-stats';

export class SwitchPortStats {
    id: string;
    stats: PortStats[];

    constructor(obj: any){
        for(let x in obj){
            this.id = x;
            break;
        }
        this.stats = [];
        for(let item of obj[this.id]){
            this.stats.push(new PortStats(item))
        }
    }
}