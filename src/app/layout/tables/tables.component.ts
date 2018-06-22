import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { ControllerStatsticsService } from '../../shared/services/controller-statstics.service'

import { FlowStats } from '../../shared/flow-stats'
import { SwitchFlowStats } from '../../shared/switch-flow-stats';
import { SwitchPortStats } from '../../shared/switch-port-stats';
import { PortStats } from '../../shared/port-stats';
import { filter } from 'rxjs/operator/filter';
import { ChartsModule as Ng2Charts } from 'ng2-charts';

@Component({
    selector: 'app-tables',
    templateUrl: './tables.component.html',
    styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {
    private switches: number[];

    private flowStats: SwitchFlowStats[];
    private portStats: SwitchPortStats[];
    private flow_data;
    private flow_labels;
    private port_data;
    private port_labels;

    constructor(private controllerStatsticsService: ControllerStatsticsService) {
        this.flowStats = [];
        this.portStats = [];
        this.switches = [];
        this.flow_data = [];
        this.flow_labels = [];
        this.port_data = [];
        this.port_labels = [];
        this.getFlowStats();
        this.getPortStats();
        // setInterval(() => {
        //     this.getFlowStats();
        //     this.getPortStats();
        // }, 6000);
    }

    flowBarChartData(): any[] {
        if (!this.flowStats) {
            return []
        }
        var flowStatsList = this.flowStats.map(function (element) {
            return element.stats
        });
        var data = [];
        var index = 0;
        var max_length = 0;
        for (let i = 0; i < flowStatsList.length; i++) {
            if (flowStatsList[i].length > max_length) {
                max_length = flowStatsList[i].length;
            }
        }
        for (let i = 0; i < max_length; i++) {
            data.push(
                {
                    "data": [],
                    "label": "Flow "+(i+1)
                }
            )
        }
        for (let i = 0; i < max_length; i++) {
            var list = data[i].data;
            for (let j = 0; j < flowStatsList.length; j++) {
                if (flowStatsList[j][i]) {
                    list.push(flowStatsList[j][i].packet_count)
                } else {
                    list.push(0);
                }
            }
        }
        if (this.dataChanged(data, this.flow_data)) {
            this.flow_data = data;
        }
        return this.flow_data;
    }
    flowBarChartLabels(): string[] {
        if (!this.flowStats) {
            return []
        }
        var labels = this.flowStats.map(function (element) {
            return "Switch " + element.id;
        });

        if (this.labelsChanged(labels, this.flow_labels)) {
            this.flow_labels = labels;
        }
        return this.flow_labels;
    }

    portBarChartData(): any[] {
        if (!this.portStats) {
            return []
        }
        var portStatsList = this.portStats.map(function (element) {
            return element.stats
        });
        var data = [];
        var index = 0;
        var max_length = 0;
        var max_length_index = 0;
        for (let i = 0; i < portStatsList.length; i++) {
            if (portStatsList[i].length > max_length) {
                max_length = portStatsList[i].length;
                max_length_index = i;
            }
        }
        for (let i = 0; i < max_length; i++) {
            data.push(
                {
                    "data": [],
                    "label": portStatsList[max_length_index][i].port_no
                }
            )
        }
        for (let i = 0; i < max_length; i++) {
            var list = data[i].data;
            for (let j = 0; j < portStatsList.length; j++) {
                if (portStatsList[j][i]) {
                    list.push(portStatsList[j][i].rx_packets)
                } else {
                    list.push(0);
                }
            }
        }
        if (this.dataChanged(data, this.port_data)) {
            this.port_data = data;
        }
        return this.port_data;
    }
    portBarChartLabels(): string[] {
        if (!this.portStats) {
            return []
        }
        var labels = this.portStats.map(function (element) {
            return "Switch " + element.id;
        });

        if (this.labelsChanged(labels, this.port_labels)) {
            this.port_labels = labels;
        }
        return this.port_labels;
    }

    dataChanged(data, old_data): boolean {
        if (data.length != old_data.length) {
            return true;
        } else {
            for (var index = 0; index < data.length; index++) {
                if (data[index].data.length != old_data[index].data.length
                    || data[index].length != old_data[index].length) {
                    return true;
                } else {
                    for (var index2 = 0; index2 < data.length; index2++) {
                        if (data[index].data[index2] != old_data[index].data[index2]) {
                            return true;
                        }
                    }
                }
            }
        }
        return false;
    }
    labelsChanged(labels, old_labels) {
        if (labels.length != old_labels.length) {
            return true;
        }
        for (var i = 0; i < old_labels.length; i++) {
            if (old_labels[i] != (labels[i])) {
                return true;
            }
        }
        return false;
    }

    ngOnInit() { }

    getSwitches(after = null) {
        var comp = this;
        this.controllerStatsticsService.getSwitches().subscribe((data) => {
            this.switches = data;
            if (after) after(comp);
        })
    }
    getFlowStats() {
        var after = function (comp) {
            comp.flowStats = [];
            for (var i = 0; i < comp.switches.length; i++) {
                var switch_no = comp.switches[i];
                comp.controllerStatsticsService.getFlowStats(switch_no).subscribe(data => {
                    comp.flowStats.push(new SwitchFlowStats(data));
                });
            }
        }
        if (this.switches) {
            this.getSwitches(after)
        }
        else {
            after(this);
        }
    }

    getPortStats() {
        var after = function (comp) {
            comp.portStats = [];
            for (var i = 0; i < comp.switches.length; i++) {
                var switch_no = comp.switches[i];
                comp.controllerStatsticsService.getPortStats(switch_no).subscribe(data => {
                    comp.portStats.push(new SwitchPortStats(data));
                });
            }
        }
        if (this.switches) {
            this.getSwitches(after)
        }
        else {
            after(this);
        }
    }

    getFlowStatsBySwitchNumber(switch_no): FlowStats[] {
        var item = this.flowStats.find(function (element) {
            return parseInt(element.id) == switch_no;
        })
        if (item) {
            return item.stats;
        }
        return undefined;
    }

    getPortStatsBySwitchNumber(switch_no): PortStats[] {
        var item = this.portStats.find(function (element) {
            return parseInt(element.id) == switch_no;
        })
        if (item) {
            return item.stats;
        }
        return undefined;
    }

}
