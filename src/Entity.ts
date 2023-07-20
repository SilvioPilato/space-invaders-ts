import { BoxCollider } from "./BoxCollider"
import { RenderComponent } from "./Renderer"

export type Transform = {
	x: number,
	y: number
}

export class Entity {	
	constructor(id: string){
		this._position = { x: 0, y: 0 }
		this._scale = { x: 1, y: 1}
		this.id = id
	}

	public readonly id;
 	
	private _scale: Transform;
	private _position: Transform;
	private _sprite ?: ImageBitmap;
        private _renderComponent ?: RenderComponent;
	get position(): Transform {
		return this._position;
	}
	set position(value: Transform) {
		this._position = value;
	}
	
	get scale(): Transform {
		return this._scale;
	}
	set scale(value: Transform) {
		this._scale = value;
	}
	
	get sprite(): ImageBitmap | undefined {
		return this._sprite;
	}
	set sprite(value: ImageBitmap | undefined) {
		this._sprite = value;
	}
	get renderComponent() : RenderComponent | undefined {
		return this._renderComponent;
	}
	set renderComponent(component: RenderComponent) {
		this._renderComponent = component;
	}
	update() {}
        setup() {}
	onCollisionStart(collider: BoxCollider) {}
}
