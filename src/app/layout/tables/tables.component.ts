import { Component, OnInit } from '@angular/core';
import { ControllerStatsticsService } from '../../shared/services/controller-statstics.service'

@Component({
    selector: 'app-tables',
    templateUrl: './tables.component.html',
    styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {
    private switches: number[];
    private flowStats: any[];
    private portStats: any[];

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
                    comp.flowStats.push(data)
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
                    comp.portStats.push(data)
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

    getFlowStatsBySwitchNumber(switch_no) {
        var item = this.flowStats.find(function (element) {
            return element[switch_no];
        })
        if (item) {
            return item[switch_no];
        }
        return undefined;
    }

    getPortStatsBySwitchNumber(switch_no) {
        var item = this.portStats.find(function (element) {
            return element[switch_no];
        })
        if (item) {
            return item[switch_no];
        }
        return undefined;
    }

}
