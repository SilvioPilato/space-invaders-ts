import { Engine } from "./Engine";
import { Entity } from "./Entity";

export class Bullet extends Entity {
	speed = 0.5;
	update(): void {
	    this.position.y -= this.speed * Engine.DeltaTime;
	}
}
