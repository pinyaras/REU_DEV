import { Node } from './node';
import { Link } from './link';


export class Network {
    private id: number = 1;
	links: Link[];
	nodes: Node[];

    constructor() { 

    	this.links = [];
    	this.nodes = [];

    }

    areConnected(n1: Node, n2: Node): boolean {  
        return this.links.some(function(link) {
            return link.hasNode(n1) && link.hasNode(n2);
		})
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
    addLink(n1, n2) : void { 
        this.links.push(new Link(n1, n2))
    }
    addNode(name: string, type: string) : void { 
        this.nodes.push(new Node(this.id, name, type)); 
        this.id++;
    }
	removeLink(n1, n2) : void { 
		for(let x = 0; x < this.links.length; x++) {
			if(this.areConnected(n1,n2)) {
				this.links.splice(x, 1);
			}
		}
	}
    removeNode(node) : void{ 
        let index = this.nodes.indexOf(node)
        this.nodes.splice(index, 1);
        
        this.links.forEach(function(link, i) {
            if(link.hasNode(node)){
				this.splice(i, 1);
			}
		}, this.links);
	}
}


