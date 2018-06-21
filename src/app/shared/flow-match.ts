export class Match {
    in_port:string;
    dl_src:string;
    dl_dst:string;
    dl_type:string;
    nw_src:string;
    nw_dst:string;
    nw_proto:string;
    tp_src:string;
    tp_dst:string;

    constructor(obj: any) {
        this.in_port = obj.in_port ? obj.in_port : "*";
        this.dl_src = obj.dl_src ? obj.dl_src : "*";
        this.dl_dst = obj.dl_dst ? obj.dl_dst : "*";
        this.dl_type = obj.dl_type ? obj.dl_type : "*";
        this.nw_src = obj.nw_src ? obj.nw_src : "*";
        this.nw_dst = obj.nw_dst ? obj.nw_dst : "*";
        this.nw_proto = obj.nw_proto ? obj.nw_proto : "*";
        this.tp_src = obj.tp_src ? obj.tp_src : "*";
        this.tp_dst = obj.tp_dst ? obj.tp_dst : "*";
    }
}