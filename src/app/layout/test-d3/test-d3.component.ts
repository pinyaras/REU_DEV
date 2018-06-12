import { Component, ElementRef, NgZone, OnDestroy, OnInit } from '@angular/core';
import { Node } from '../../shared/node';
import { Link } from '../../shared/link';
import { Network } from '../../shared/network';
import { NetworkService } from '../../shared/services/network.service'
import {
  D3Service,
  D3
} from 'd3-ng2-service';



@Component({
  selector: 'app-test-d3',
  templateUrl: './test-d3.component.html',
  styleUrls: ['./test-d3.component.scss']
})
export class TestD3Component implements OnInit {

    private static readonly NODE_RADIUS = 20;
    private static readonly NODE_COLORS = {
        "controller": "gray",
        "host": "tomato",
        "switch": "dodgerblue"
    };

    private static readonly SVG_FILL = "#292b2c";

    private network: Network;

    private d3: D3;
    private parentNativeElement: any;

    constructor(d3Service: D3Service, networkService: NetworkService) {
      this.d3 = d3Service.getD3();
      networkService.getNetwork().subscribe(data => this.network = data);
    }

    ngOnInit() {
        
        let svg = this.d3.select("svg")
        svg.style("background-color", TestD3Component.SVG_FILL);

        svg.selectAll("circle")
          .data(this.network.nodes)
          .enter()
          .append("circle.node")
          .attr("r", TestD3Component.NODE_RADIUS)
          .attr("fill", function(node){
            return TestD3Component.NODE_COLORS[node.name]
          })
          .attr("cx", 20)
          .attr("cy", 50)
        console.log(this.network);
    }
}
