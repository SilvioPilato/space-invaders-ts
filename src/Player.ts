import { BoxCollider } from "./../2gong/src/BoxCollider";
import { Bullet } from "./Bullet";
import { Engine } from "../2gong/src/Engine";
import { Entity } from "../2gong/src/Entity";
import { KeyboardHandler } from "../2gong/src/KeyboardHandler";
import { SpriteComponent } from "../2gong/src/SpriteComponent";
export class Player extends Entity {
	public bulletPng ?: ImageBitmap;
	private _playerSpeed = 0.5;
	private _bulletShot = 0;
	private _shotCD = 200;
	private _currentShotCD = 0;
	private _reloading = false;
	private bulletSpawnY = 32;
	private bulletScale = {x: 1, y: 2};
        private minX = 20;
	private maxX = 780;
	setup(): void 
	{
		if(!this.sprite) return;
		this.renderComponent = new SpriteComponent(this.sprite);
		this.maxX -= this.sprite.width * this.scale.x;
	}

	update() {
		if (this._reloading) {
			this._currentShotCD += Engine.DeltaTime;
		}
		if (this._currentShotCD >= this._shotCD) {
			this._reloading = false;
			this._currentShotCD = 0;	
		}
		if (KeyboardHandler.isHold("ArrowLeft") && this.position.x > this.minX) {
			this.position.x -= this._playerSpeed * Engine.DeltaTime;
		}
		if (KeyboardHandler.isHold("ArrowRight")&& this.position.x < this.maxX) {
			this.position.x += this._playerSpeed * Engine.DeltaTime;
		}
		if (KeyboardHandler.isPressed("Space") && !this._reloading ) {
			if (!this.sprite) return;
			const bullet = new Bullet(`bullet-${this._bulletShot}`);	
			const posX = this.position.x + (this.sprite.width * this.scale.x) /2;
			bullet.position = {x: posX, y: this.position.y + this.bulletSpawnY};
			bullet.sprite = this.bulletPng;
			bullet.scale = this.bulletScale; 
			Engine.addEntity(bullet);
			if (this.bulletPng) {
				const collider = new BoxCollider(
					bullet,
					this.bulletPng.width * bullet.scale.x,
					this.bulletPng.height * bullet.scale.y,
				)
				Engine.addCollider(collider);
			}
			this._bulletShot++;
			this._reloading = true;
		}
	}	
}
