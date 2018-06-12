import { Node } from './node';
import { Link } from './link';


export class Network {

	links: Link[];
	nodes: Node[];

	constructor() { }
	areConnected(n1, n2): boolean { 
		let isConnected = false;
		this.links.forEach(function(link) {
			if(link.node1.id == n1.id && link.node2.id == n2.id) {
				isConnected =  true;
			} 
			if(link.node1.id == n2.id && link.node2.id == n1.id) {
				isConnected =  true;
			} 
		})
		return isConnected;
	}
	adjNodes(node): Node[] { 
		let aNodes = [];
		this.links.forEach(function(link) {
			if(link.hasNode(node)) {
				if(link.node1.id == node.id) {
					aNodes.push(link.node2)
				} else {
					aNodes.push(link.node1)
				}
			}
		})
		return aNodes;
	}
	addLink(n1, n2) { this.links.push(new Link(n1, n2))}
	addNode(name, type) { this.nodes.push(new Node(name, type))}
	removeLink(n1, n2) { 
		for(let x = 0; x < this.links.length; x++) {
			if(this.areConnected(n1,n2)) {
				this.links.splice(x, 1);
			}
		}
	}
	removeNode(node) { 
		var nodes = this.nodes;
		this.nodes.forEach(function(n, i) {
			if(n.id = node.id) {
				nodes.splice(i, 1);
			}
		})
	}
}












