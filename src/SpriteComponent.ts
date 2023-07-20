import { Entity } from "./Entity";
import { RenderComponent } from "./Renderer";
export class SpriteComponent implements RenderComponent {
	public readonly sprite: ImageBitmap;
	constructor(sprite: ImageBitmap) {
		this.sprite = sprite;
	}

	render(entity: Entity, context: CanvasRenderingContext2D): void {
		context.drawImage(
			this.sprite,
			entity.position.x,
			entity.position.y,
			this.sprite.width * entity.scale.x,
			this.sprite.height * entity.scale.y,
		);
		
	};

}
