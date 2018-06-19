import { Component, ElementRef, NgZone, OnDestroy } from '@angular/core';
import { Node } from '../../shared/node';
import { Link } from '../../shared/link';
import { Network } from '../../shared/network';
import { NetworkService } from '../../shared/services/network.service'
import { WirelessNode } from '../../shared/wirelessnode';

@Component({
  selector: 'app-test-d3',
  templateUrl: './test-d3.component.html',
  styleUrls: ['./test-d3.component.scss']
})
export class TestD3Component {
  nodes: Node[];
  links: Link[];

  private old_nodes: Node[];
  private old_links: Link[];
  constructor(private networkService: NetworkService) {
    this.load();
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

  load(): void {
    var comp = this;
    // Get Nodes
    this.networkService.getNodes().subscribe(node_data => {
      var new_nodes = [];
      node_data.forEach(node => {
        new_nodes.push(new Node(node))
      })
      // Get Wireless
      this.networkService.getWirelessNodes().subscribe(function (wireless_data) {
        wireless_data.forEach(function (wn) {
          var node = new_nodes.find(function (node) {
            return node.id === wn.node;
          })
          node.wireless = new WirelessNode(wn);
        })
        if (comp.nodes_changed(new_nodes)) {
          comp.nodes = new_nodes;
        }
        comp.old_nodes = new_nodes;
      });
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

    setTimeout(() => this.load(), 6000);
  }
}
