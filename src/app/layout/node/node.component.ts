import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NetworkService } from '../../shared/services/network.service';
import { Node } from '../../shared/node';
import { WirelessNode } from '../../shared/wirelessnode';
import { DataJson } from '../../shared/DataJson';



@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.scss']
})
export class NodeComponent implements OnInit {

  routerAPs: WirelessNode[];
  routerNodes: Node[];

  constructor(
    private networkService: NetworkService,
    private router: Router) { }

  ngOnInit() {
    this.getNodes();
    this.getWirelessNodes();
  }

  getNodes() {
    this.networkService.getNodes().subscribe(data => {
      this.routerNodes = data;
    })
  }

  getWirelessNodes() {
    this.networkService.getWirelessNodes().subscribe(data => {
      this.routerAPs = data;
    })
  }

  onShowDetail(node: Node) {
    this.router.navigate(['/node', node.id, 'router_ip',  node.nodeIp]);
  }

}
