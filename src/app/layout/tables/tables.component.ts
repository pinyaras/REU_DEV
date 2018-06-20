import { Component, OnInit } from '@angular/core';
import { ControllerStatsticsService } from '../../shared/services/controller-statstics.service'

@Component({
    selector: 'app-tables',
    templateUrl: './tables.component.html',
    styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {
    private switches: number[];
    private flowStats: {};

    constructor(private controllerStatsticsService: ControllerStatsticsService) {
        this.flowStats = {};
        this.switches = [];
        //this.getSwitches();
        this.getFlowStats();
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
                comp.controllerStatsticsService.getFlowStats(comp.switches[i]).subscribe((data) => {
                    comp.flowStats[i] = data[i];
                    console.log(comp.flowStats);
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
}
