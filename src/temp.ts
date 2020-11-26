class RenderSupport {
	private types = new Map<string, EntitySupport>();
	private types2 = new Map<string, typeof EntitySupport>();
	
	constructor() {
	
	}

	registerType(type: string, support: EntitySupport) {
		this.types[type] = support;
		support.support = this;
	}

	registerType2(type: string, SupportClass: typeof EntitySupport) {
		this.types2[type] = SupportClass;
	}

	render(data:Entity) {
		const support: EntitySupport = this.types[data.type];
		if (support) {
			support.render(data);
		}
	}
}

interface Entity {
	type: string,
	name?: string,
	x?: number,
	y?: number,
	rotation?: number,
	scaleX?: number,
	scaleY?: number,
}

interface Container extends Entity {
	children?: Entity[],
}

interface Image extends Entity {
	src?: string,
}

abstract class EntitySupport {
	support: RenderSupport;
	render(data:Entity) {

	}
}

class ContainerSupport extends EntitySupport {
	render(data: Container) {
		if (data.children) {
			for (let i = 0; i < data.children.length; i++) {
				this.support.render(data.children[i]);
			}
		}
	}
}

class ImageSupport extends EntitySupport {
	render(data:Image) {

	}
}

const CONTAINER = 'container';
const IMAGE = 'image';

const data = {
	type: 'container',
	children: [
		{ type: 'image', x: 100, y: 100, src: 'icon.png' },
		{ type: 'image', x: 100, y: 200, src: 'button.png' }
	]
}

const game:Container = data;
const image = game.children[0] as Image;
console.log(image.src);


const support = new RenderSupport();
support.registerType(CONTAINER, new ContainerSupport());
support.registerType(IMAGE, new ImageSupport());
support.registerType(IMAGE, typeof ImageSupport);

support.render(data);
