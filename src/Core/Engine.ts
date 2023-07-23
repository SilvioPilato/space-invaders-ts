import { BoxCollider } from "./BoxCollider";
import { Collisions } from "./Collisions";
import { Entity } from "./Entity";
import { KeyboardHandler } from "./KeyboardHandler";
import { Renderer } from "./Renderer";

export class Engine {
	private static _deltaTime: number;
	private static _activeEntities: Entity[] = [];
	private static _entitiesToSetup: Set<Entity>;
	private static _collidersToSetup: Set<BoxCollider>;
	private static _activeColliders: BoxCollider[] = [];
	private static _entitiesToRemove: Set<Entity>;
	private static _timeScale: number = 1;
	private _collisions: Collisions;
	private _renderer: Renderer;
	private _inputHandler: KeyboardHandler;
	private _startTime = 0.0;

	constructor(renderer: Renderer, collisions: Collisions, inputHandler: KeyboardHandler) {
		this._renderer = renderer;
		this._collisions = collisions;
		this._inputHandler = inputHandler;
		Engine._entitiesToRemove = new Set();
		Engine._entitiesToSetup = new Set();
		Engine._collidersToSetup = new Set();
	}

	static get DeltaTime() {
		return Engine._deltaTime;
	};
	
	static get ActiveEntities(): Entity[] {
		return Engine._activeEntities;
	};
	
	static addEntity(entity: Entity) {
		Engine._entitiesToSetup.add(entity);	
	}

	static addCollider(collider: BoxCollider) {
		Engine._collidersToSetup.add(collider);
	}

	static removeEntity(entity: Entity) {
		this._entitiesToRemove.add(entity);	
	}
	
	static get TimeScale() {
		return Engine._timeScale;
	}

	static set TimeScale(timescale: number) {
		Engine._timeScale = timescale;
	}

	static cleanUp() {
		// entities will be removed in the next frame
		for(let entity of Engine.ActiveEntities) {
			Engine._entitiesToRemove.add(entity);
		}
	}

	tick(timestamp: DOMHighResTimeStamp) {
		const ts = timestamp.valueOf();
		if (Engine.DeltaTime == undefined) {
			this._startTime = ts; 
		}
		// preupdate phase
		Engine._deltaTime = (ts - this._startTime) * Engine.TimeScale;
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

		for (let collider of Engine._collidersToSetup) {
			Engine._activeColliders.push(collider);
			Engine._collidersToSetup.delete(collider);
		}

		// update phase
		for (let entity of Engine.ActiveEntities) {
			entity.update();
		}
	
		let collidingPairs = this._collisions.execute(Engine._activeColliders);
		for (let [collidingA, collidingB] of collidingPairs) {
			collidingA.entity.onCollisionStart(collidingB);
			collidingB.entity.onCollisionStart(collidingA);
		}
		
		// Post update phase
		this._inputHandler.clear();
		this._renderer.render(Engine.ActiveEntities);
		this._startTime = ts;
	}
}
