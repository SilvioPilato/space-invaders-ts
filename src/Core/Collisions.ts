import { BoxCollider } from "./BoxCollider";
export class Collisions {
	execute(colliders: BoxCollider[]): Array<Array<BoxCollider>> {
		// Sweep and prune algorithm
		let active = [];
		let candidates = [];
		let intersecting = [];
		colliders.sort(this.xAxisComparer);

		for (let i = 0; i < colliders.length; i++) {
			for (let j = 0; j < active.length; ++j) {
				if (this.isIntersectingX(active[j], colliders[i])) {
					candidates.push([active[j], colliders[i]]);
				} else {
					active.shift();
					j--;
				}
			}
			active.push(colliders[i]);
		}
	
		for (let [left, right] of candidates) {
			if (this.isIntersectingY(left, right)) {
				intersecting.push([left, right]);	
			}
		}

		return intersecting;
	}

	private isIntersectingX(left: BoxCollider, right: BoxCollider): boolean {
		// AABB collision detection
		const leftMinX = left.Position.x;
		const rightMinX = right.Position.x;
		const leftMaxX = left.Position.x + left.width;
		const rightMaxX = right.Position.x + right.width;
		if (leftMaxX < rightMinX) return false;
		if (rightMaxX < leftMinX) return false;
		return true;
	}

	private isIntersectingY(left: BoxCollider, right: BoxCollider): boolean {
		// AABB collision detection
		const leftMaxY= left.Position.y + left.height;
		const rightMaxY = right.Position.y + right.height;
		const leftMinY = left.Position.y;
		const rightMinY = right.Position.y;

		if (rightMaxY < leftMinY) return false;
		if (leftMaxY < rightMinY) return false;

		return true;
	}

	private xAxisComparer(left: BoxCollider, right: BoxCollider) {
		if (left.entity.position.x < right.entity.position.x) {
			return -1;
		}

		return left.entity.position.x > right.entity.position.x ? 1 : 0;
	}
}

