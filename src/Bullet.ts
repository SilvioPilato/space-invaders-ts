import { BoxCollider } from "../2gong/src/BoxCollider";
import { Engine } from "../2gong/src/Engine";
import { Entity } from "../2gong/src/Entity";
import { SpriteComponent } from "./../2gong/src/SpriteComponent";

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
