import { BoxCollider } from "./Core/BoxCollider";
import { Engine } from "./Core/Engine";
import { Entity } from "./Core/Entity";
import { SpriteComponent } from "./Core/SpriteComponent";

export class Bullet extends Entity {
	speed = 0.5;
	setup(): void {	    
		if(!this.sprite) return;
		this.renderComponent = new SpriteComponent(this.sprite);
	}	
	update(): void {
	    this.position.y -= this.speed * Engine.DeltaTime;
	}

	onCollisionStart(collider: BoxCollider): void {
		if (collider.entity.id == "player-ship") return;
		Engine.removeEntity(this);
	}
}
