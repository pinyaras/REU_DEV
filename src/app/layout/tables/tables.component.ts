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
    private old_data;
    private labels;

    constructor(private controllerStatsticsService: ControllerStatsticsService) {
        this.flowStats = [];
        this.portStats = [];
        this.switches = [];
        this.old_data = [];
        this.labels = [];
        this.getFlowStats();
        this.getPortStats();
    }

    barChartData(): any[] {
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
                    "label": i
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

        if (this.dataChanged(data, this.old_data)) {
            this.old_data = data;
        }
        return this.old_data;
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
    barChartLabels(): string[] {
        if (!this.flowStats) {
            return []
        }
        var labels = this.flowStats.map(function (element) {
            return "Switch " + element.id;
        });
        if (this.labels.length != labels.length) {
            // console.log(labels);
            this.labels = labels;
        }
        for (var i = 0; i < this.labels.length; i++) {
            if (this.labels[i] != (labels[i])) {
                this.labels = labels;
                return this.labels;
            }
        }
        return this.labels;
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
