import { Match } from './flow-match';

export class FlowStats {
    match: Match;
    actions: string[];
    duration_sec: string;
    packet_count: string;
    byte_count: string;

    constructor(obj: any) {
        this.match = new Match(obj.match);
        this.actions = obj.actions;
        this.duration_sec = obj.duration_sec;
        this.packet_count = obj.packet_count;
        this.byte_count = obj.byte_count;
    }
}