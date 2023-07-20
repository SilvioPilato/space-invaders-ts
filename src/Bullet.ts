import { BoxCollider } from "./BoxCollider";
import { Engine } from "./Engine";
import { Entity } from "./Entity";
import { SpriteComponent } from "./SpriteComponent";

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
