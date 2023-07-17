import { Entity, Transform } from "./Entity";
export class BoxCollider {
	public readonly entity;
	public readonly width;
	public readonly height;
	constructor(entity: Entity, width = 1, height = 1) {
		this.entity = entity;
		this.width = width;
		this.height = height;
	}

	get Position(): Transform {
		return this.entity.position
	}
}

