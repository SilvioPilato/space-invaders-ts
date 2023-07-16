import { BoxCollider } from "./BoxCollider";
import { Entity } from './Entity';
export class Collisions {
	execute(colliders: BoxCollider[]): Array<Array<Entity>> | undefined {
		// Sweep and prune algorithm
		let intervals = [];
		colliders.sort(this.xAxisComparer);
		
		let active = [colliders[0]]
		for (let i = 1; i < colliders.length; i++) {
			active.push(colliders[i])

		}
		return undefined;	
	}

	xAxisComparer = (left: BoxCollider , right: BoxCollider) => {
		if (left.entity.position.x < right.entity.position.x) {
			return -1;
		}

		return left.entity.position.x > right.entity.position.x ? 1 : 0;
	}
}

