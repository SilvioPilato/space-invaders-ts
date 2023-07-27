import { BoxCollider } from "./Core/BoxCollider";
import { Engine } from "./Core/Engine";
import { Entity, Transform } from "./Core/Entity";
import { SpriteComponent } from "./Core/SpriteComponent";
import { GameChannel } from "./Core/GameChannel";
import { INVADER_DOWN, INVADER_TOUCH } from "./Events";

export class Invader extends Entity {
	private xDirection = 1; // 1 = right -1 = left
	private speed = 0.07;
	public distToSwitchX = 100;
	private distToSwitchY = 32;
	private travelDown = false;
	private touchThreshold = 500;
	private originPosition: Transform = {x: this.position.x, y: this.position.y};
	
	setup(): void 
	{
		if(!this.sprite) return;
		this.renderComponent = new SpriteComponent(this.sprite);
		this.originPosition = {x: this.position.x, y: this.position.y};
	}

	update(): void {
		if (this.position.y >= this.touchThreshold) {
			GameChannel.EventTarget.dispatchEvent(new CustomEvent(INVADER_TOUCH));
		}
		if (this.travelDown) {
			const movement = this.position.y + this.speed * Engine.DeltaTime;
			const positionY = Math.min(this.originPosition.y + this.distToSwitchY, movement);
			if (movement >= this.originPosition.y + this.distToSwitchY) {
				this.originPosition.y = this.position.y;
				this.travelDown = false;
			}
			this.position.y = positionY;
			return;
		}
		
		const movement = this.position.x + this.speed * Engine.DeltaTime * this.xDirection;
		const maxMove = this.originPosition.x + this.distToSwitchX * this.xDirection;
		const positionX = this.xDirection > 0 ? Math.min(maxMove, movement) : Math.max(maxMove, movement);

		if ((this.xDirection > 0 && movement>= maxMove) || (this.xDirection < 0 && movement<=maxMove)) {
			this.originPosition.x = this.position.x;
			this.xDirection = -this.xDirection;
			this.travelDown = true;
		}
		this.position.x = positionX;
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
