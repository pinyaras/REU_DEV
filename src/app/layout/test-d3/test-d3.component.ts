import { Component, ElementRef, NgZone, OnDestroy, OnInit } from '@angular/core';
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
export class TestD3Component implements OnInit {
  private nodes: Node[];
  private links: Link[];

  constructor(networkService: NetworkService) {
    
  }

  ngOnInit() {
  }
}
