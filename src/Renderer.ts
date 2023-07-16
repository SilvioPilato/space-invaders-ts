import { Entity } from "./Entity";

export class Renderer {
    constructor(canvas: HTMLCanvasElement) {
	this.canvas = canvas;
	this.context = canvas.getContext("2d");
	if (this.context) {
	    this.context.imageSmoothingEnabled = false;
	}
    }
    readonly canvas;
    readonly context;
    render(entities: Entity[]) {
	if(!this.context) return;
        this.context.clearRect(0,0, this.canvas.width, this.canvas.height);

	for (let entity of entities) {
		if (!entity.sprite) {
			continue;
		}
		this.context.drawImage(
			entity.sprite,
			entity.position.x, 
			entity.position.y,
			entity.sprite.width * entity.scale.x,
			entity.sprite.height * entity.scale.y,
		);
	    
	}
    }  
}
