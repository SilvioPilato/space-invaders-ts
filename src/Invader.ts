import { BoxCollider } from "./Core/BoxCollider";
import { Engine } from "./Core/Engine";
import { Entity } from "./Core/Entity";
import { SpriteComponent } from "./Core/SpriteComponent";
import { GameChannel } from "./Core/GameChannel";
import { INVADER_DOWN, INVADER_TOUCH } from "./Events";

export class Invader extends Entity {
	private xDirection = 1; // 1 = right -1 = left
	private speed = 0.07;
	public distToSwitchX = 100;
	private traveled = 0;
	private yTraveled = 0;
	private distToSwitchY = 32;
	private travelDown = false;
	private touchThreshold = 500;
	
	setup(): void 
	{
		if(!this.sprite) return;
		this.renderComponent = new SpriteComponent(this.sprite);
	}

	update(): void {
		if (this.position.y >= this.touchThreshold) {
			GameChannel.EventTarget.dispatchEvent(new CustomEvent(INVADER_TOUCH));
		}
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
		console.log(this.traveled)
		if (this.traveled >= this.distToSwitchX || this.traveled < 0) {
			this.xDirection = -this.xDirection;
			this.travelDown = true;
		}
	}

	onCollisionStart(collider: BoxCollider): void {
		if (collider.entity.id == "player-ship") {
			GameChannel.EventTarget.dispatchEvent(new CustomEvent(INVADER_TOUCH));
			return;
		}
		GameChannel.EventTarget.dispatchEvent(new CustomEvent(INVADER_DOWN));
		Engine.removeEntity(this);
	}
}
