import './style.css';
import { Engine } from '../2gong/src/Engine';
import { ImageLoader } from '../2gong/src/ImageLoader';
import { KeyboardHandler } from '../2gong/src/KeyboardHandler';
import { Renderer } from '../2gong/src/Renderer';
import bgPng from './assets/img/bg.png';
import shipPng from './assets/img/ship.png';
import invaderPng from './assets/img/alien.png';
import bulletPng from './assets/img/bullet.png';
import { Collisions } from '../2gong/src/Collisions';
import { GameManager } from './GameManager';
import { Game } from './Game';

// fetch resources
const images = await Promise.all([
	ImageLoader.fromURL(bgPng),
	ImageLoader.fromURL(shipPng),
	ImageLoader.fromURL(invaderPng),
	ImageLoader.fromURL(bulletPng)
]);
// setup canvas and renderer
const canvas = document.createElement("canvas") as HTMLCanvasElement;
canvas.height = 600;
canvas.width = 800;
const renderer = new Renderer(canvas);
document.querySelector<HTMLDivElement>('#app')!.appendChild(canvas);

const collisions = new Collisions();
const keyboardHandler = new KeyboardHandler();
const engine = new Engine(renderer, collisions, keyboardHandler);
const game = new Game(canvas, {
	background: images[0],
	ship: images[1],
	invader: images[2],
	bullet: images[3],
});
new GameManager(24, game);
game.start();
const gameLoop = (timestamp: DOMHighResTimeStamp) => {
	engine.tick(timestamp);
	requestAnimationFrame(gameLoop);
}
requestAnimationFrame(gameLoop);
