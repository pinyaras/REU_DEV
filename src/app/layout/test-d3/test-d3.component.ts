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
        "line": "snow",
        "text": "#292b2c"
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
        let d3 = this.d3;
        let svg = this.d3.select("svg")
        svg.style("background-color", TestD3Component.SVG_FILL);

        let delete_hover = function(){
          svg.select("#hover").remove();
        }
        
        let on_hover = function(d){
          svg.select("#hover").remove();
          let coords = d3.mouse(this);
          // console.log(coords);
          let g = svg.append("g")
            .attr("id", "hover");
          let size = d.getInfoLst().length
          g.append("rect")
            .attr("x", coords[0]+1)
            .attr("y", coords[1]-((size + 1)*12+7))
            .attr("width", "100")
            .attr("height", (size + 0.5)+"em" )
            .attr("fill", "aliceblue")
            .attr("opacity", ".750")
            .attr("rx", 3)
            .attr("ry", 3);
          let text = g.append("text")
            .attr("x", coords[0] + 5)
            .attr("y", coords[1] - ((size + 1)*12+5))
            .attr("fill", TestD3Component.COLORS["TEXT"]);

          d.getInfoLst().forEach(function(info) {
            text.append('tspan')
              .text(info)
              .attr('dy', 1+'em')
              .attr('x', coords[0] + 5);

          })

        }

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
          .on("mousemove", on_hover)
          .on("mouseout", delete_hover);

        let circles = svg.selectAll("image")
          .data(this.network.nodes)
          .enter()
          .append("image")
          .style("fill", 'red')
          .attr('xlink:href', 'assets/images/router.svg')
          .attr('width', 60)
          .attr('height', 60)
          .attr("x", function(d) { return d.x - 30; })
          .attr("y", function(d) { return d.y - 30; })
          .on("mousemove", on_hover)
          .on("mouseout", delete_hover);
    }

}
















