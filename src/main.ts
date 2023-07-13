
import { Entity } from './Entity';
import { ImageLoader } from './ImageLoader';
import { Renderer } from './Renderer';
import bgPng from './assets/img/bg.png';
import shipPng from './assets/img/ship.png';

// fetch resources
const images = await Promise.all([
	ImageLoader.fromURL(bgPng),
	ImageLoader.fromURL(shipPng)
]);
const bgImage = images[0];
const shipImage = images[1]

// setup canvas and renderer
const canvas = document.createElement("canvas") as HTMLCanvasElement;
canvas.height = 600;
canvas.width = 800;
const renderer = new Renderer(canvas);
// load entities
const background = new Entity();
const ship = new Entity();
background.scale = {
	x: canvas.width / bgImage.width,
	y: canvas.height / bgImage.height,
}
const shipScale = {
	x: 0.1,
	y: 0.1
}
ship.position = {
	x: canvas.width / 2 - (shipImage.width * shipScale.x)/2,
	y: canvas.height - shipImage.height * shipScale.y * 2
}
ship.scale = shipScale; 
background.sprite = bgImage;
ship.sprite = shipImage;
const entities = [background, ship];

// start rendering and attach canvas to document
renderer.render(entities);
document.querySelector<HTMLDivElement>('#app')!.appendChild(canvas);
