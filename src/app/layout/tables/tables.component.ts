import { Component, OnInit } from '@angular/core';
import { ControllerStatsticsService } from '../../shared/services/controller-statstics.service'

import {FlowStats} from '../../shared/flow-stats'
import { SwitchFlowStats } from '../../shared/switch-flow-stats';
import { SwitchPortStats } from '../../shared/switch-port-stats';
import { PortStats } from '../../shared/port-stats';

@Component({
    selector: 'app-tables',
    templateUrl: './tables.component.html',
    styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {
    private switches: number[];
    private flowStats: SwitchFlowStats[];
    private portStats: SwitchPortStats[];

    constructor(private controllerStatsticsService: ControllerStatsticsService) {
        this.flowStats = [];
        this.portStats = [];
        this.switches = [];
        this.getFlowStats();
        this.getPortStats();
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
