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
			const bullet = new Bullet(`bullet-${this._bulletShot}`);
			bullet.position = {x: this.position.x, y: this.position.y - 100};
			bullet.sprite = this.bulletPng;
			bullet.scale = {x: 1, y: 2}
			Engine.addEntity(bullet);
			this._bulletShot++;
			this._reloading = true;
		}
	}	
}
