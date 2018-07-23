import { Component, ElementRef, NgZone, OnDestroy, Input, OnChanges } from '@angular/core';
import { Node } from '../../shared/node';
import { Link } from '../../shared/link';
import { Host } from '../../shared/host';
import { Network } from '../../shared/network';
import { NetworkService } from '../../shared/services/network.service'
import { ControllerStatsticsService } from '../../shared/services/controller-statstics.service'
import * as d3 from 'd3';
import { WirelessNode } from '../../shared/wirelessnode';


@Component({
  selector: 'app-network-svg',
  templateUrl: './network-svg.component.html',
  styleUrls: ['./network-svg.component.scss']
})
export class NetworkSvgComponent implements OnChanges {

  private static readonly NODE_RADIUS = 20;
  private static readonly COLORS = {
    "line": "dodgerblue",
    "active_line": "#34BD62",
    "line-disabled": "darkred",
    "text": "#292b2c",
    "packet": "white"
  };
  private static readonly PADDING = 20;
  private static readonly SVG_FILL = "#292b2c";
  private static readonly PACKETS_PER_LINE = 3;
  private static readonly PACKET_LENGTH = 6;
  private static readonly PACKET_TIME = 100;

  private parentNativeElement: any;
  private hostLocations: any = {};
  private hostToSwitch: any = {};

  @Input()
  nodes: Node[];
  @Input()
  links: Link[];
  @Input()
  hosts: Host[];
  @Input()
  active_nodes: any[];

  @Input()
  all_flows: [string,string][];

  selectedNode: Node;
  editting: boolean = false;
  networkService: NetworkService;
  controllerService: ControllerStatsticsService;
  oldx: number = 0;
  oldy: number = 0;
  static mousedown: boolean = false;
  index: number = 0;
  hostLinks: Link[];

  constructor(networkService: NetworkService, controllerService: ControllerStatsticsService) {
    this.networkService = networkService;
    this.controllerService = controllerService;
  }

  ngOnChanges(): void {
    if (this.links) {
      // Assume all links are not active until decided later
      this.links.forEach(link => {
        link.active = false;
        link.byteRate = 0;
      })}
      if(this.hosts){
        this.hostLinks = []
      for(let host of this.hosts) {
        let link = new Link({"nexthopNode" : host.clientIp,
          "nodeId": host.node,
          "bw": 0,
          "isHost": true});
        this.hostLinks.push(link)

      }
    }
    if (this.nodes) {
      if (this.active_nodes) {
          var link_pairs = this.active_nodes.map(function (tuple) {

            var the_wirelessnode = this.getNodeByWlMac(tuple[2])
            if(the_wirelessnode){
              return [this.getNodeByDpid(tuple[0]), the_wirelessnode, tuple[3]];
            } else {
              return [this.getNodeByDpid(tuple[0]), this.getHostByMac(tuple[2]), tuple[3]]
            }
          }, this).filter(function(tuple){
            // make sure both nodes were found
            return tuple[0] && tuple[1]
          });
          for (let link_pair of link_pairs) {
            let l = this.getLink(link_pair[0], link_pair[1]);
            if (l) {
              l.active = true;
              l.byteRate = link_pair[2];
            }
          }
        }
      this.myOnInit();
    }
  }

  getNodeByDpid(dpid: string) {
    return this.nodes.find(n => {
      return n.dpid == dpid;
    })
  }

  // getHostByIp(ip: string) {
  //   return this.hosts.find(host => {
  //     return host.clientIp == ip;
  //   }
  // }

  getNodeByWlMac(mac: string) {
    return this.nodes.find(n => {
      let found = false
      n.wireless.forEach(wn => {
        //console.log(wn.macAdd + " " + mac)
        //console.log(wn.macAdd == mac)
        if(wn.macAdd == mac) {
          found = true;
        }
      })
      return found;
    })
  }

  getHostByMac(mac: string){
    return this.hosts.find(n => {
      return n.clientMac == mac;
    })
  }

  getNodeByIp(ip: string): Node {
    return this.nodes.find(function (n) {
      return n.nodeIp == ip;
    })
  }

  getNodeById(id: number): Node {
    return this.nodes.find(function (n) { return n.id == id; })
  }

  displayWireless(i: number) {
    this.index = i;
  }

  myOnInit() {
    var comp = this;

    if (this.nodes.length > 0 && !this.nodes[0].wireless) {
      return;
    }

    if(!this.hosts) {
      return;
    }

    for(let host of this.hosts) {

      let s = this.nodes.find(node => {
        return node.id == host.node;
      })
      if(s) {
        this.hostToSwitch[host.id] = s
      }
    }

    for(let key in this.hostToSwitch) {

      let s = this.hostToSwitch[key]

      this.hostLocations[key] = [s.xloc + 50, s.yloc + 50]

    }

    for(let host of this.hosts) {

      host.xloc = this.hostLocations[host.id][0]
      host.yloc = this.hostLocations[host.id][1]

    }



    var svg = d3.select("svg")
    d3.selectAll('svg > *').remove()
    svg.style("background-color", NetworkSvgComponent.SVG_FILL);
    let width = svg.style('width');
    let height = parseInt(svg.style('height'));

    let locations = {
      "woodward": "35.3070814,-80.735740"
    }
    let url = "https://maps.google.com/maps/api/staticmap" +
      "?key=AIzaSyCDvRL-n6Nh7bnPv4VsAhFKdWCRxc6LcI8" +
      "&center=" + locations.woodward +
      "&zoom=20" +
      "&size=300x600" +
      "&maptype=roadmap" +
      // "&scale=2" +
      "&style=feature:landscape|element:geometry.fill|color:0x292b2c" +
      "&style=feature:landscape|element:geometry.stoke||color:0x000000" +
      "&style=feature:all|element:labels|visibility:off"
    svg.append('image')
      .attr("id", "map")
      // .attr('xlink:href', url)
      .attr('xlink:href', 'assets/images/floor2.svg')
      // .attr('transform', "translate(705 -300) rotate(90 180 15)")
      .attr('width', 900)              //Original dimensions 900 x 600
      .attr('height', 600)



    /*this.nodes.forEach(function (node, i) {
      if (node.x || node.y) return;
      node.x = Math.cos((i / this.nodes.length) * Math.PI * 2) * 200 + 450;
      node.y = Math.sin((i / this.nodes.length) * Math.PI * 2) * 200 + 300;
    }, this)*/

    let delete_hover = function () {
      svg.select("#hover").remove();
      d3.select(this).attr('r', NetworkSvgComponent.NODE_RADIUS);
    }
    //show mouse location textbox-------------------------
    /*
    let text = svg.append('text')
        .attr('x', 20)
        .attr('y', 580)
        .text('0 0')
        .attr('font-size', '20px')
        .attr('fill', 'white')
    svg.on('mousemove', function(d) {
        let coords = d3.mouse(this);
        text.text(coords[0] + " " + coords[1])
    }) //------------------------------------------------ */
    //HoverBox
    let on_hover = function (d) {
      svg.select("#hover").remove();

      d3.select(this).attr('r', NetworkSvgComponent.NODE_RADIUS + 5)
      let info = d.getInfoLst()

      let g = svg.append("g")
        .attr("id", "hover");
      let size = d.getInfoLst().length
      let NodeInfo = d.getInfoLst()
      let MaxInfolen = 0

      // Calculate Rectangle width
      for (var x = 0; x < NodeInfo.length; x++) {
        var CurInfoLen = NodeInfo[x].length
        if (CurInfoLen > MaxInfolen) {
          MaxInfolen = CurInfoLen
        }
      }
      var RectWidth = (MaxInfolen * 8.5) + 10

      //Determine HoverBox position & keeps it inside the map
      var imagelimit = d3.select('#map').attr('height')
      var coords = d3.mouse(this)

      // X component limiter (flip over)
      if (d3.mouse(this)[0] > 668) {
        coords[0] = coords[0] - 10 - RectWidth
      }
      // Y component limiter
      if (d3.mouse(this)[1] > 300) {
        coords[1] = coords[1] - 15
      }
      // bottom of image
      if (d3.mouse(this)[1] + ((size + 0.5) * 13.90) > imagelimit) {
        coords[1] = imagelimit - ((size + 0.5) * 13.90) - 30
      }

      g.append("rect")
        .attr("x", coords[0] + 5)
        .attr("y", coords[1] - (((size + 1) * 2.3) - 27))
        .attr("width", RectWidth)
        .attr("height", (size + 0.5) + "em")
        .attr("fill", "AliceBlue")
        .attr("stroke", "#333333")
        .attr("stroke-width", 2)
        .attr("stroke-opacity", .4)
        .attr("opacity", ".750")
        .attr("rx", 3)
        .attr("ry", 3);
      let text = g.append("text")
        .attr("x", coords[0] + 5)
        .attr("y", coords[1] - (((size + 1) * 2.3) - 27))
        .attr("fill", NetworkSvgComponent.COLORS["TEXT"]);
      d.getInfoLst().forEach(function (info) {
        text.append('tspan')
          .text(info)
          .attr('dy', 1 + 'em')
          .attr('x', coords[0] + 10); //Original + 5
      })
    }

    /*for (let x = 0; x < this.nodes.length; x++) {
      for (let i = x + 1; i < this.nodes.length; i++) {
        svg.append('line').attr('class', 'allLines')
          .attr('node1', x)
          .attr('node2', i)
          .attr('stroke-width', 5)
          .attr('stroke', 'dodgerblue')
          .attr('opacity', .2)
      }
    }*/
    // Visual lines between nodes
    var lines = svg.selectAll('.link')
      .data(this.links)
      .enter()
      .append('line')
      .attr('stroke-width', 5)
      .attr("class", "link")
      .attr("stroke-dasharray", function(d) {
          return "25,10"
      })
      .attr("stroke", NetworkSvgComponent.COLORS['line'])
      .on("mousemove", on_hover)
      .on("mouseout", delete_hover)
      .on('dblclick', function (l) {
        l.enabled = !l.enabled;
        render(comp);
      })

    let hostLines = svg.selectAll('.hostLink')
    .data(this.hostLinks)
    .enter()
    .append('line')
    .attr('stroke-width', 5)
    .attr("class", "link")
    .attr("stroke", NetworkSvgComponent.COLORS['line'])
    .on("mousemove", on_hover)
    .on("mouseout", delete_hover)
    .on('dblclick', function (l) {
      l.enabled = !l.enabled;
      render(comp);
    })

    var nodes = svg.selectAll("image.nodes")
      .data(this.nodes)
      .enter()
      .append("image")
      .attr('xlink:href', 'assets/images/router.svg')
      .attr('width', 50)
      .attr('height', 50)
      .on("mousemove", on_hover)
      .on("mouseout", delete_hover)
      .on("click", function (d) { comp.editNode(d) });

    var hosts = svg.selectAll("image.hosts")
      .data(this.hosts)
      .enter()
      .append("image")
      .attr('xlink:href', 'assets/images/host.svg')
      .attr('width', 40)
      .attr('height', 40)
      .on("mousemove", on_hover)
      .on("mouseout", delete_hover)


    render(comp);

    let dragHandler = d3.drag().on('start', function (d) {
      svg.select("#hover").remove();
      comp.oldx = d.xloc;
      comp.oldy = d.yloc;
      NetworkSvgComponent.mousedown = true;
    })
      .on('drag', function (d) {
        svg.select("#hover").remove();
        let coords = d3.mouse(this);
        if (coords[0] + 20 < parseInt(width) && coords[0] - 20 > 0
          && coords[1] + 20 < height && coords[1] - 20 > 0) {
          d.xloc = coords[0];
          d.yloc = coords[1];
          let node = d3.select(this);
          node.attr('x', d.xloc + 25)
          node.attr('y', d.yloc + 25);
          render(comp);
        }
      })
      .on("end", function (d) {
        NetworkSvgComponent.mousedown = false;
        let nodes = []
        comp.nodes.forEach(function (node) {
          if (node.id === d.id) {
            nodes.push(node);
          }
        })
        if (comp.oldx != d.xloc || comp.oldy != d.yloc) {
          nodes.forEach(function (node) {
            comp.networkService.updateNode(node).subscribe()
          })
        }
      })

    let hostDragHandler = d3.drag().on("start", d => {

      NetworkSvgComponent.mousedown = true;

      }
    )
    .on("drag", d => {


    })
    .on("end", d => {


    })

    dragHandler(svg.selectAll('image.nodes'));

    function render(comp) {

      svg.selectAll('.allLines')
        .each(function () {
          let line = d3.select(this);
          let node1 = parseInt(line.attr('node1'))
          let node2 = parseInt(line.attr('node2'))
          line.attr('x1', comp.nodes[node1].xloc)
            .attr('y1', comp.nodes[node1].yloc)
            .attr('x2', comp.nodes[node2].xloc)
            .attr('y2', comp.nodes[node2].yloc)
        })
      lines.attr("x1", function (l) {  return comp.getNodeById(l.nodeId[0]).xloc; })
        .attr("y1", function (l) { return comp.getNodeById(l.nodeId[0]).yloc; })
        .attr("x2", function (l) {
            if(l.isHost) {
              // return comp.getNodeById(l.nodeId[0]).xloc + 70;
              return comp.hostLocations[l.nodeId][0] + 20;
            } else {
              return comp.getNodeById(l.nexthopNode).xloc;
            }
          })
        .attr("y2", function (l) {
          if(l.isHost) {
            // return comp.getNodeById(l.nodeId[0]).yloc + 70;
            return comp.hostLocations[l.nodeId][1] + 20;
          } else {
            return comp.getNodeById(l.nexthopNode).yloc;
          }
        })
        .attr('stroke', function (l) {
          if (l.active) {
            return NetworkSvgComponent.COLORS['active_line'];
          } else if (!l.enabled) {
            return NetworkSvgComponent.COLORS['line-disabled']
          } else {
            return NetworkSvgComponent.COLORS['line'];
          }
        })
         hostLines.attr("x1", function(h) { return comp.getHostByIp(h.nexthopNode).xloc + 25; })
           .attr("y1", function(h) { return comp.getHostByIp(h.nexthopNode).yloc + 25 })
          .attr("x2", function(h) { return comp.hostToSwitch[h.nodeId].xloc})
           .attr("y2", function(h) { return comp.hostToSwitch[h.nodeId].yloc})
           .attr('stroke', function (l) {
             if (l.active) {
               return NetworkSvgComponent.COLORS['active_line'];
             } else if (!l.enabled) {
               return NetworkSvgComponent.COLORS['line-disabled']
             } else {
               return NetworkSvgComponent.COLORS['line'];
             }
           })

      nodes.attr('class', 'nodes')
        .attr("x", function (d) { return d.xloc - 25; })
        .attr("y", function (d) { return d.yloc - 25; })

      hosts.attr('class', 'hosts')
        .attr('x', d => { return d.xloc })
        .attr('y', d => { return d.yloc })

    }
  }

  editNode(d) {
    var comp = this;
    let modal = document.getElementById('myModal');
    let editModal = document.getElementById('myEditModal');
    let node = d3.select(this);
    this.selectedNode = d;
    modal.style.display = "block";
    let span = document.getElementsByClassName("close")[0];
    span.addEventListener("click", function () {

      modal.style.display = "none";
      comp.editting = false;

    })

    let editButton = document.getElementById("editButton");
    editButton.addEventListener("click", function () {

      comp.editting = true;

    })

    let saveButton = document.getElementById("saveButton");
    saveButton.addEventListener("click", function () {

      comp.editting = false;
      modal.style.display = "none";
      comp.networkService.updateNode(comp.selectedNode).subscribe()

    })
  }

  getLink(n1: Node, n2: any): Link {
    if(n2 instanceof Node) {
      for (let x = 0; x < this.links.length; x++) {

        if (this.links[x].nodeId[0] == n1.id && this.links[x].nexthopNode === n2.id) {
          return this.links[x];
        }
        if (this.links[x].nodeId[0] == n2.id && this.links[x].nexthopNode === n1.id) {
          return this.links[x];
        }
      }
    } else {
      for (let x = 0; x < this.hostLinks.length; x++) {
        var bool1 = (this.hostLinks[x].nexthopNode == n2.clientIp)
        var bool2 = (this.hostLinks[x].nodeId[0] == n1.id)
        if (bool1 && bool2) {
          return this.hostLinks[x];
        }
      }
    }
    return null;
  }
}
