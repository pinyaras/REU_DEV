export class PortStats {
    port_no: string;
    rx_packets: string;
    rx_bytes: string;
    rx_dropped: string;
    rx_errors: string;
    tx_packets: string;
    tx_bytes: string;
    tx_dropped: string;
    tx_errors: string;

    constructor(obj: any) {
        this.port_no = obj.port_no;
        this.rx_packets = obj.rx_packets;
        this.rx_bytes = obj.rx_bytes;
        this.rx_dropped = obj.rx_dropped;
        this.rx_errors = obj.rx_errors;
        this.tx_packets = obj.tx_packets;
        this.tx_bytes = obj.tx_bytes;
        this.tx_dropped = obj.tx_dropped;
        this.tx_errors = obj.tx_errors;
    }

    equals(obj: PortStats) {
        return this.port_no == obj.port_no
            && this.rx_packets == obj.rx_packets
            && this.rx_bytes == obj.rx_bytes
            && this.rx_dropped == obj.rx_dropped
            && this.rx_errors == obj.rx_errors
            && this.tx_packets == obj.tx_packets
            && this.tx_bytes == obj.tx_bytes
            && this.tx_dropped == obj.tx_dropped
            && this.tx_errors == obj.tx_errors
    }
}