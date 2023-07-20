import { BoxCollider } from "./BoxCollider";
import { Engine } from "./Engine";
import { Entity } from "./Entity";
import { SpriteComponent } from "./SpriteComponent";
import { GameChannel } from "./channels/GameChannel";

export class Invader extends Entity {
	private xDirection = 1; // 1 = right -1 = left
	private speed = 0.07;
	public distToSwitchX = 100;
	private traveled = 0;
	private yTraveled = 0;
	private distToSwitchY = 32;
	private travelDown = false;
	private onDeath ?: EventTarget;
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

	setup(): void 
	{
		if(!this.sprite) return;
		this.renderComponent = new SpriteComponent(this.sprite);
	}

	onCollisionStart(collider: BoxCollider): void {
		if (collider.entity.id == "player-ship") return;
		GameChannel.EventTarget.dispatchEvent(new CustomEvent("invader-down"));
		Engine.removeEntity(this);
	}
}
