import './style.css';
import { Engine } from './Core/Engine';
import { Entity } from './Core/Entity';
import { ImageLoader } from './Core/ImageLoader';
import { KeyboardHandler } from './Core/KeyboardHandler';
import { Player } from './Player';
import { Renderer } from './Core/Renderer';
import { Invader } from "./Invader";
import bgPng from './assets/img/bg.png';
import shipPng from './assets/img/ship.png';
import invaderPng from './assets/img/alien.png';
import bulletPng from './assets/img/bullet.png';
import { Collisions } from './Core/Collisions';
import { BoxCollider } from './Core/BoxCollider';
import { SpriteComponent } from './Core/SpriteComponent';
import { Score } from './Score';
import { GameManager } from './GameManager';

// fetch resources
const images = await Promise.all([
	ImageLoader.fromURL(bgPng),
	ImageLoader.fromURL(shipPng),
	ImageLoader.fromURL(invaderPng),
	ImageLoader.fromURL(bulletPng)
]);
const bgImage = images[0];
const shipImage = images[1];
const invaderImage = images[2];
const bulletImage = images[3];
// setup canvas and renderer
const canvas = document.createElement("canvas") as HTMLCanvasElement;
canvas.height = 600;
canvas.width = 800;
const renderer = new Renderer(canvas);
document.querySelector<HTMLDivElement>('#app')!.appendChild(canvas);

const collisions = new Collisions();
new KeyboardHandler();
const engine = new Engine(renderer, collisions);

// load entities
const background = new Entity('bg');

background.scale = {
	x: canvas.width / bgImage.width,
	y: canvas.height / bgImage.height,
}
background.renderComponent = new SpriteComponent(bgImage);

const ship = new Player('player-ship');
const shipScale = {
	x: 0.2,
	y: 0.2
}
ship.position = {
	x: canvas.width / 2 - (shipImage.width * shipScale.x) / 2,
	y: canvas.height - shipImage.height * shipScale.y * 3/2
}
ship.scale = shipScale;
ship.sprite = shipImage;
ship.bulletPng = bulletImage;

const shipCollider = new BoxCollider(
	ship, 
	ship.sprite.width * ship.scale.x, 
	ship.sprite.height * ship.scale.y
);
const score = new Score('player-score'); 
score.position = {x: canvas.width * 4/5, y: 32 }
Engine.addCollider(shipCollider);
Engine.addEntity(background);
Engine.addEntity(ship);
Engine.addEntity(score);

let rows = 3;
let cols = 8;
let gapX = invaderImage.width + 300;
let gapY = invaderImage.height + 100;
let offsetX = 50;
let offsetY = 32;

const scale = 0.08;
const distToTravel = canvas.width - (gapX * cols * scale + offsetX) - offsetX;
for (let row = 0; row < rows; row++) {
	for (let col = 0; col < cols; col++) {
		const invader = new Invader(`invader-${row}-${col}`);
		invader.position.x = gapX * col * scale + offsetX;
		invader.position.y = gapY * row * scale + offsetY;
		invader.sprite = invaderImage;
		invader.scale.x = scale;
		invader.scale.y = scale;
		invader.distToSwitchX = distToTravel;
		const invaderCollider = new BoxCollider(
			invader,
			invader.sprite.width * invader.scale.x,
			invader.sprite.height * invader.scale.y,
		)
		Engine.addCollider(invaderCollider);
		Engine.addEntity(invader);
	}
}
new GameManager(rows * cols);
const gameLoop = (timestamp: DOMHighResTimeStamp) => {
	engine.tick(timestamp);
	requestAnimationFrame(gameLoop);
}
requestAnimationFrame(gameLoop);
