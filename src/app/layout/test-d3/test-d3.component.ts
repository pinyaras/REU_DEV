import { Component, ElementRef, NgZone, OnDestroy, OnInit } from '@angular/core';
import { Node } from '../../shared/node';
import { Link } from '../../shared/link';
import { Network } from '../../shared/network';
import { NetworkService } from '../../shared/services/network.service'
import * as d3 from 'd3';
import {
  D3Service,
  D3
} from 'd3-ng2-service';
import { WirelessNode } from '../../shared/wirelessnode';

@Component({
  selector: 'app-test-d3',
  templateUrl: './test-d3.component.html',
  styleUrls: ['./test-d3.component.scss']
})
export class TestD3Component implements OnInit {

  private static readonly NODE_RADIUS = 20;
  private static readonly COLORS = {
    "controller": "snow",
    "host": "tomato",
    "switch": "dodgerblue",
    "line": "#34BD62",
    "text": "#292b2c"
  };
  private static readonly NODE_IMAGES = {

    'controller': 'controller.svg',
    'host': 'host.svg',
    'switch': 'router.svg'

  }

  private static readonly PADDING = 20;
  private static readonly SVG_FILL = "#292b2c";

  // private network: Network;

  // private d3: D3;
  private parentNativeElement: any;

  private nodes: Node[];
  private wirelessnodes: WirelessNode[];
  private links: Link[];

  constructor(d3Service: D3Service, networkService: NetworkService) {
    // this.d3 = d3Service.getD3();
    //let nodes = [];
    this.nodes = [];
    this.wirelessnodes = [];
    this.links = [];
    networkService.getNodes().toPromise().then(nodes => {
      networkService.getWirelessNodes().toPromise().then(wirelessnodes => {
        networkService.getWirelessLinks().toPromise().then(links => {
          nodes.forEach(function (node) {
            this.nodes.push(new Node(node));
          }, this)
          wirelessnodes.forEach(function(wn) {
            this.wirelessnodes.push(new WirelessNode(wn));
          }, this)
          links.forEach(function(link) {
            this.links.push(new Link(link));
          }, this)
          this.myOnInit();
        })
      })
    });

  }

  getNodeByIp(ip: string): Node {
    return this.nodes.find(function (n) { return n.nodeIp == ip; })
  }

  getNodeById(id: number): Node {
    return this.nodes.find(function (n) { return n.id == id; })
  }

  ngOnInit() {


  }

  myOnInit() {

    let svg = d3.select("svg")
    svg.style("background-color", TestD3Component.SVG_FILL);

    let width = svg.style('width');
    let height = parseInt(svg.style('height'));

    let locations = {
      "woodward": "35.3070814,-80.735740"
    }
    let url = "https://maps.google.com/maps/api/staticmap" +
      "?key=AIzaSyCDvRL-n6Nh7bnPv4VsAhFKdWCRxc6LcI8" +
      "&center=" + locations.woodward +
      "&zoom=20" +
      "&size=900x600" +
      "&maptype=roadmap" +
      "&style=feature:landscape|element:geometry.fill|color:0x292b2c" +
      "&style=feature:landscape|element:geometry.stoke||color:0x000000" +
      "&style=feature:all|element:labels|visibility:off"
    svg.append('image')
      .attr("id", "map")
      .attr('xlink:href', url)
      //.attr('xlink:href', 'assets/images/floor2.svg')
      .attr('width', 900)
      .attr('height', 600)
      .attr('x', 0)
      .attr('y', 0)
    console.log(this.nodes);
    var length = this.nodes.length;
    this.nodes.forEach(function (node, i) {
      // console.log(node)
      node.x = Math.cos((i / length) * Math.PI * 2) * 100 + 300;
      node.y = Math.sin((i / length) * Math.PI * 2) * 100 + 200;

    })

    let delete_hover = function () {
      svg.select("#hover").remove();
      d3.select(this).attr('r', TestD3Component.NODE_RADIUS);
    }

    let on_hover = function (d) {
      svg.select("#hover").remove();
      let coords = d3.mouse(this);
      d3.select(this).attr('r', TestD3Component.NODE_RADIUS + 5);
      // console.log(coords);
      let g = svg.append("g")
        .attr("id", "hover");
      let size = d.getInfoLst().length
      g.append("rect")
        .attr("x", coords[0] + 3)
        .attr("y", coords[1] - ((size + 1) * 12 + 7))
        .attr("width", "100")
        .attr("height", (size + 0.5) + "em")
        .attr("fill", "aliceblue")
        .attr("opacity", ".750")
        .attr("rx", 3)
        .attr("ry", 3);
      let text = g.append("text")
        .attr("x", coords[0] + 5)
        .attr("y", coords[1] - ((size + 1) * 12 + 5))
        .attr("fill", TestD3Component.COLORS["TEXT"]);

      d.getInfoLst().forEach(function (info) {
        text.append('tspan')
          .text(info)
          .attr('dy', 1 + 'em')
          .attr('x', coords[0] + 5);

      })

    }

    // var lines;
    var lines = [];
    this.links.forEach(function (linkObj) {
      lines.concat(svg.selectAll('line')
        .data(linkObj.nodeId)
        .enter()
        .append('line')
        .attr("x1", function (l) { return this.getNodebyId(l); })
        .attr("y1", function (l) { return this.getNodebyId(l); })
        .attr("x2", function (l) { return this.getNodebyIp(linkObj.nexthopNode); })
        .attr("y2", function (l) { return this.getNodebyIp(linkObj.nexthopNode); })
        .attr('stroke', function (d) {
          return "snow";
        })
        .attr('stroke-width', 5)
      )
    })

    // console.log(lines);


    var nodes = svg.selectAll("image.nodes")
      .data(this.nodes)
      .enter()
      .append("image")

    // console.log(nodes);

    render();

    // let dragHandler = d3.drag().on('start', function(d) {

    //   svg.select("#hover").remove();

    // })
    //   .on('drag', function(d) {

    //     svg.select("#hover").remove();
    //     let coords = d3.mouse(this);
    //     d.x = coords[0];
    //     d.y = coords[1];
    //     let node = d3.select(this);
    //     node.attr('x', d.x - 30)
    //     node.attr('y', d.y - 30);
    //     render();

    //   })

    // dragHandler(svg.selectAll('image.nodes'));

    function render() {

      // lines.attr('x1', function(d) { return d; })
      //     .attr('y1', function(d) { return d.node1.y })
      //     .attr('x2', function(d) { return d.node2.x })
      //     .attr('y2', function(d) { return d.node2.y })
      //     .attr('stroke', function(d) { 

      //       if(d.enabled) {
      //         return TestD3Component.COLORS['line'];
      //       } else {
      //         return 'snow';
      //       }

      //     })
      //     .attr('stroke-width', 5)
      //     .on("mousemove", on_hover)
      //     .on("mouseout", delete_hover)
      //     .on("dblclick", function(d) {

      //       d.enabled = !d.enabled;
      //       if(d.enabled) {
      //         d3.select(this).attr('opacity', 1)
      //       } else {
      //         d3.select(this).attr('opacity', .25)
      //       }
      //       render();

      //     });

      nodes.attr('class', 'nodes')
        .attr('xlink:href', function (d) { return 'assets/images/' + TestD3Component.NODE_IMAGES['host'] })
        .attr('width', 50)
        .attr('height', 50)
        .attr("x", function (d) { return d.x + 100; })
        .attr("y", function (d) { return d.y - 30; })
        .on("mousemove", on_hover)
        .on("mouseout", delete_hover);
    }

  }

}
