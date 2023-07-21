import { BoxCollider } from "./BoxCollider";
import { Collisions } from "./Collisions";
import { Entity } from "./Entity";
import { Renderer } from "./Renderer";

export class Engine {
	private static _deltaTime: number;
	private static _activeEntities: Entity[] = [];
	private static _entitiesToSetup: Set<Entity>;
	private static _activeColliders: BoxCollider[] = [];
	private static _entitiesToRemove: Set<Entity>;
	private collisions: Collisions;
	private _renderer: Renderer;
	private startTime = 0.0;

	static get DeltaTime() {
		return Engine._deltaTime;
	};
	static get ActiveEntities(): Entity[] {
		return Engine._activeEntities;
	};

	constructor(renderer: Renderer, collisions: Collisions) {
		this._renderer = renderer;
		this.collisions = collisions;
		Engine._entitiesToRemove = new Set();
		Engine._entitiesToSetup = new Set();
	}

	static addEntity(entity: Entity) {
		Engine._entitiesToSetup.add(entity);	
	}

	static addCollider(collider: BoxCollider) {
		Engine._activeColliders.push(collider);
	}

	static removeEntity(entity: Entity) {
		this._entitiesToRemove.add(entity);	
	}

	tick(timestamp: DOMHighResTimeStamp) {
		const ts = timestamp.valueOf();
		if (Engine.DeltaTime == undefined) {
			this.startTime = ts; 
		}
		// preupdate phase
		Engine._deltaTime = ts - this.startTime;
		// this entity deletion method is pretty inefficient
		for (let entity of Engine._entitiesToRemove) {
			Engine._activeEntities = Engine._activeEntities.filter(active => active.id != entity.id);
			Engine._activeColliders = Engine._activeColliders.filter(active => active.entity.id != entity.id);
			Engine._entitiesToRemove.delete(entity);
		}

		for (let entity of Engine._entitiesToSetup) {
			entity.setup();
			Engine._activeEntities.push(entity);
			Engine._entitiesToSetup.delete(entity);
		}
		// update phase
		for (let entity of Engine.ActiveEntities) {
			entity.update();
		}
	
		let collidingPairs = this.collisions.execute(Engine._activeColliders);
		for (let [collidingA, collidingB] of collidingPairs) {
			collidingA.entity.onCollisionStart(collidingB);
			collidingB.entity.onCollisionStart(collidingA);
		}
		
		// Post update phase
		this._renderer.render(Engine.ActiveEntities);
		this.startTime = ts;
	}
}
