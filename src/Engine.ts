import { BoxCollider } from "./BoxCollider";
import { Entity } from "./Entity";
import { Renderer } from "./Renderer";

export class Engine {
	private static _deltaTime = 0.0;
	private static _activeEntites: Entity[] = [];
	private _activeColliders: BoxCollider[] = []; 
	private _renderer: Renderer;
	private startTime = 0.0;

	static get DeltaTime() {
		return Engine._deltaTime;
	};
	static get ActiveEntities(): Entity[] {
		return Engine._activeEntites;
	};

	constructor(renderer: Renderer) {
		this._renderer = renderer;
	}

	static addEntity(entity: Entity) {
		Engine._activeEntites.push(entity);	
	}

	tick() {		
		if (Engine.DeltaTime <= 0) {
			this.startTime = Date.now();
		}

		// update phase
		for (let entity of Engine.ActiveEntities) {
			entity.update();
		}

		// collision phase
			

		
		// Post update phase
		this._renderer.render(Engine.ActiveEntities);
		const now = Date.now();
		Engine._deltaTime = now - this.startTime;
		this.startTime = now;
	}
}
