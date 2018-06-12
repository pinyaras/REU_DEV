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
    private static readonly COLORS = {
        "controller": "#34BD62",
        "host": "tomato",
        "switch": "dodgerblue",
        "line": "snow"
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

        let lines = svg.selectAll('line')
          .data(this.network.links) 
          .enter()
          .append('line')
          .attr('x1', function(d) { return d.node1.x})
          .attr('y1', function(d) { return d.node1.y})
          .attr('x2', function(d) { return d.node2.x})
          .attr('y2', function(d) { return d.node2.y})
          .attr('stroke', TestD3Component.COLORS['line'])
          .attr('stroke-width', 5)

        let circles = svg.selectAll("circle")
          .data(this.network.nodes)
          .enter()
          .append("circle")
          .attr("r", TestD3Component.NODE_RADIUS)
          .attr("fill", function(node){
            return TestD3Component.COLORS[node.type]
          })
          .attr("cx", function(d) { return d.x; })
          .attr("cy", function(d) { return d.y; })
    }

}
















