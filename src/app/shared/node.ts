
export class Node {

	id: number;
	name: string;
	type: string;
	x: number;
	y: number;

	constructor(id, name, type) { 
        this.id = id;
		this.name = name;
		this.type = type;

	}

	getInfoLst() {

		return [this.name, this.type];

	}

}
