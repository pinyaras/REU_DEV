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

    equals(obj: SwitchPortStats){
        if(this.id != obj.id || this.stats.length != obj.stats.length){
            return false;
        }
        for(var i = 0 ; i < this.stats.length; i++){
            if(!this.stats[i].equals(obj.stats[i])){
                return false;
            }
        }
        return true;
    }
}