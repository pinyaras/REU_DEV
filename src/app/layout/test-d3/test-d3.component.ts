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
  constructor(networkService: NetworkService) {
    
    var comp = this;
    networkService.getNodes().subscribe(data => {
      this.nodes = [];
      data.forEach(node => {
        this.nodes.push(new Node(node))
      }, this)
      networkService.getWirelessNodes().subscribe(function(data) {
        data.forEach(function(wn) {
          var node = comp.nodes.find(function(node) {
            return node.id === wn.node;
          })
          node.wireless = wn;
        })
        comp.nodes = comp.nodes.slice();
      });
    });
    networkService.getWirelessLinks().subscribe(data => {
      this.links = [];
      data.forEach(link => {
        this.links.push(new Link(link))
      }, this)
      comp.links = comp.links.slice()
    });

    // setTimeout(function() {
    //   comp.nodes.push(new Node({
    //     "id": 7,
    //     "nodeIp": "10.0.0.7",
    //     "nodeMac": "00:00:00:00:00:07",
    //     "nodeName": "Mesh7"
    //   }))
    //   comp.nodes = comp.nodes.slice();
    // }, 2000)
  }
}
