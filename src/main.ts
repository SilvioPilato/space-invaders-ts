import './style.css';
import { Engine } from './Engine';
import { Entity } from './Entity';
import { ImageLoader } from './ImageLoader';
import { KeyboardHandler } from './KeyboardHandler';
import { Player } from './Player';
import { Renderer } from './Renderer';
import { Invader } from "./Invader";
import bgPng from './assets/img/bg.png';
import shipPng from './assets/img/ship.png';
import invaderPng from './assets/img/alien.png';
import bulletPng from './assets/img/bullet.png';

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


new KeyboardHandler();
const engine = new Engine(renderer);

// load entities
const background = new Entity('bg');
const ship = new Player('player-ship');
ship.bulletPng = bulletImage;

background.scale = {
	x: canvas.width / bgImage.width,
	y: canvas.height / bgImage.height,
}
const shipScale = {
	x: 0.2,
	y: 0.2
}
ship.position = {
	x: canvas.width / 2 - (shipImage.width * shipScale.x) / 2,
	y: canvas.height - shipImage.height * shipScale.y * 2
}
ship.scale = shipScale;
background.sprite = bgImage;
ship.sprite = shipImage;


Engine.addEntity(background);
Engine.addEntity(ship);

let rows = 3;
let cols = 8;
let gapX = invaderImage.width + 300;
let gapY = invaderImage.height + 100;
let offsetX = 50;
let offsetY = 32;

// (w + 32)K 
// m
// k
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
		Engine.addEntity(invader);
	}
}
const gameLoop = () => {
	engine.tick();
	requestAnimationFrame(gameLoop);
}
requestAnimationFrame(gameLoop);
