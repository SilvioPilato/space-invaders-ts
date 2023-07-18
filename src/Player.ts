import { BoxCollider } from "./BoxCollider";
import { Bullet } from "./Bullet";
import { Engine } from "./Engine";
import { Entity } from "./Entity";
import { KeyboardHandler } from "./KeyboardHandler";
export class Player extends Entity {
	private _playerSpeed = 0.5;
	public bulletPng ?: ImageBitmap;	
        private _bulletShot = 0;
        private _shotCD = 250;
	private _currentShotCD = 0;
	private _reloading = false;
	update() {
		if (this._reloading) {
			this._currentShotCD += Engine.DeltaTime;
		}
		if (this._currentShotCD >= this._shotCD) {
			this._reloading = false;
			this._currentShotCD = 0;	
		}
		if (KeyboardHandler.isPressed("ArrowLeft")) {
			this.position.x -= this._playerSpeed * Engine.DeltaTime;
		}
		if (KeyboardHandler.isPressed("ArrowRight")) {
			this.position.x += this._playerSpeed * Engine.DeltaTime;
		}
		if (KeyboardHandler.isPressed("Space") && !this._reloading ) {
			if (!this.sprite) return;
			const bullet = new Bullet(`bullet-${this._bulletShot}`);	
			const posX = this.position.x + (this.sprite.width * this.scale.x) /2;
			bullet.position = {x: posX, y: this.position.y - 16};
			bullet.sprite = this.bulletPng;
			bullet.scale = {x: 1, y: 2}
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
