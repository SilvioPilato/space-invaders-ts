import { BoxCollider } from "../2gong/src/BoxCollider";
import { Engine } from "../2gong/src/Engine";
import { Entity } from "../2gong/src/Entity";
import { SpriteComponent } from "../2gong/src/SpriteComponent";
import { Invader } from "./Invader";
import { Player } from "./Player";
import { Score } from "./Score";

type Images = {
    background: ImageBitmap,
    ship: ImageBitmap,
    invader: ImageBitmap,
    bullet: ImageBitmap,
}

export class Game {
    private canvas:  HTMLCanvasElement;
    private images: Images;
    private iteration = 0;

    constructor(canvas: HTMLCanvasElement, images: Images) {
        this.canvas = canvas;
        this.images = images;
    }

    start() {
        this.iteration++;
        const bgImage = this.images.background;
        const shipImage = this.images.ship;
        const invaderImage = this.images.invader;
        const bulletImage = this.images.bullet;
        const background = new Entity('bg');

        background.scale = {
            x: this.canvas.width / bgImage.width,
            y: this.canvas.height / bgImage.height,
        }
        background.renderComponent = new SpriteComponent(bgImage);

        const ship = new Player('player-ship');
        const shipScale = {
            x: 0.2,
            y: 0.2
        }
        ship.position = {
            x: this.canvas.width / 2 - (shipImage.width * shipScale.x) / 2,
            y: this.canvas.height - shipImage.height * shipScale.y * 3/2
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
        score.position = {x: this.canvas.width * 4/5, y: 32 }

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
        const distToTravel = this.canvas.width - (gapX * cols * scale + offsetX) - offsetX;
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
    }
}
