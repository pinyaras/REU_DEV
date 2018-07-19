import { Component, ElementRef, NgZone, OnDestroy } from '@angular/core';

import { Node } from '../../shared/node';
import { Link } from '../../shared/link';
import { Host } from '../../shared/host';
import { Network } from '../../shared/network';
import { WirelessNode } from '../../shared/wirelessnode';
import { SwitchFlowStats } from '../../shared/switch-flow-stats';
import { FlowStats } from '../../shared/flow-stats';
import { NetworkService } from '../../shared/services/network.service'
import { ControllerStatsticsService } from '../../shared/services/controller-statstics.service'
import { NetworkSvgComponent } from '../network-svg/network-svg.component';

@Component({
  selector: 'app-test-d3',
  templateUrl: './test-d3.component.html',
  styleUrls: ['./test-d3.component.scss']
})
export class TestD3Component {
  nodes: Node[];
  links: Link[];
  hosts: Host[];
  // Keeps track of flows that have changed
  active_nodes: [number, string][]; // String of switch number addresses
  // All valid src, dst pairs based on flows
  all_flows: [string, string][]; // String of src, dst, 


  private old_nodes: Node[];
  private old_links: Link[];
  private old_hosts: Host[];
  constructor(private networkService: NetworkService, private controllerStatsService: ControllerStatsticsService) {
    this.load();
    setInterval(() => {
      if (!NetworkSvgComponent.mousedown) {
        this.load()
      }

    }, 3000);
  }
  private array_equal(a1, a2): boolean {
    if (a1 && a2) {
      var result = (a1.length === a2.length && a1.every((v, i) => v.equals(a2[i])))
      return result;
    } else {
      return false;
    }
  }

  private nodes_changed(node_data): boolean {
    return !this.array_equal(node_data, this.old_nodes)
  }
  private links_changed(link_data): boolean {
    return !this.array_equal(link_data, this.old_links)
  }
  private hosts_changed(host_data): boolean {
    return !this.array_equal(host_data, this.old_hosts)
  }

  switchFlowStats: SwitchFlowStats[] = [];
  load(): void {
    var comp = this;
    // Get Nodes
    this.networkService.getNodes().subscribe(node_data => {
      var new_nodes = [];
      node_data.forEach(node => {
        new_nodes.push(new Node(node))
      })

      //console.log(new_nodes)
      // Get Wireless
      this.networkService.getWirelessNodes().subscribe(function (wireless_data) {
        wireless_data.forEach(function (wn) {
          new_nodes.forEach(function (node) {
            if (node.id === wn.node) {
              node.wireless.push(new WirelessNode(wn));
            }
          })

        })
        if (comp.nodes_changed(new_nodes)) {
          comp.nodes = new_nodes;
        }
        comp.old_nodes = new_nodes;
        // Get stats to compare
        comp.controllerStatsService.getSwitches().subscribe(function (data) {
          let switches = data;
          // var updated_matches = [];
          var active_nodes = [];
          comp.active_nodes = [];
          comp.all_flows = [];
          for (let switch_no of switches) {
          /*comp.controllerStatsService.getPortDesc(switch_no).subscribe(data => {
              data = data[switch_no.toString()]
              var port = data.find(d => d.name == 'ofmesh')
              comp.nodes.forEach(node => {
                node.wireless.forEach(wl => {
                    if(wl.macAdd == port.hw_addr){
                      node.dpid = switch_no.toString();
                    }
                })
              })
            });*/
            comp.controllerStatsService.getFlowStats(switch_no).subscribe(function (stats) {
              var sfs = new SwitchFlowStats(stats);
              if (sfs.id in comp.switchFlowStats) {
                for (let fs of comp.switchFlowStats[sfs.id].stats) {
                  var old_fs = sfs.stats.find(function (other_fs) { return other_fs.match.equals(fs.match) })
                  if (old_fs && old_fs.packet_count != fs.packet_count) {
                    // Flows outputting to controller aren't displayed
                    if (!fs.actions.includes("OUTPUT:CONTROLLER")) {
                      // updated_matches.push({ "switch": switch_no, "out_port": fs.actions[0], "match": fs.match });
                      // "OUTPUT:2"
                      var dl_dst;
                      var out_port;
                      fs.actions.forEach(element => {
                        if(element.includes("MOD_DL_DST")){
                          dl_dst = element.substring(10)
                        }
                        if(element.includes("OUTPUT:")){
                          out_port = element.substring(7)
                        }
                      });
                      if (!active_nodes.includes(switch_no)) {
                        var diff = parseInt(old_fs.byte_count) - parseInt(fs.byte_count);
                        active_nodes.push([switch_no, fs.match.dl_dst, diff]);
                        comp.active_nodes = active_nodes.slice();
                      }
                      comp.all_flows.push([fs.match.dl_src, fs.match.dl_dst])
                    }
                  }
                }
              }
              comp.switchFlowStats[sfs.id] = sfs;
            })
          }
        })
      });
    });

    this.networkService.getHosts().subscribe(host_data => {
      var new_hosts = [];
      host_data.forEach(host => {
        new_hosts.push(new Host(host))
      })
      if (this.links_changed(new_hosts)) {
        comp.hosts = new_hosts;
      }
      comp.old_hosts = host_data;
    });

    //Get Links
    this.networkService.getWirelessLinks().subscribe(link_data => {
      var new_links = [];
      link_data.forEach(link => {
        new_links.push(new Link(link))
      })
      if (this.links_changed(new_links)) {
        comp.links = new_links;
      }
      comp.old_links = link_data;
    });

  }
}
