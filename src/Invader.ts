import { Engine } from "./Engine";
import { Entity } from "./Entity";

export class Invader extends Entity {
	private xDirection = 1; // 1 = right -1 = left
	private speed = 0.07;
	public distToSwitchX = 100;
	private traveled = 0;
	private yTraveled = 0;
	private distToSwitchY = 32;
	private travelDown = false;
	update(): void {
		if (this.travelDown) {
			this.position.y += this.speed * Engine.DeltaTime;
			this.yTraveled += this.speed * Engine.DeltaTime;
			if (this.yTraveled >= this.distToSwitchY) {
				this.travelDown = false;
				this.yTraveled = 0;
			}

			return;
		}

		const movement = this.xDirection * this.speed * Engine.DeltaTime;
		this.position.x += movement;
		this.traveled += movement;
		if (this.traveled >= this.distToSwitchX || this.traveled < 0) {
			this.xDirection = -this.xDirection;
			this.travelDown = true;
		}

	}
}
