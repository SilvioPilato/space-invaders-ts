import { Engine } from "./Core/Engine";
import { GameChannel } from "./Core/GameChannel";
import { INVADER_DOWN, INVADER_TOUCH, MUST_RESTART_GAME } from "./Events";
import { Game } from "./Game";
import { GameResultText } from "./GameResultText";
import { RestartText } from "./RestartText";

export class GameManager {
    private startingInvaders = 30;
    private invadersAlive = 0;
    private playing = true;
    private winText = "YOU WON";
    private loseText = "YOU LOST";
    private game: Game;

    constructor(startingInvaders: number, game: Game) {
        this.startingInvaders = startingInvaders;
        this.invadersAlive = startingInvaders;
        this.game = game;
        GameChannel.EventTarget.addEventListener(INVADER_DOWN, this.OnInvaderDead.bind(this));
        GameChannel.EventTarget.addEventListener(INVADER_TOUCH, this.OnInvaderTouch.bind(this));
        GameChannel.EventTarget.addEventListener(MUST_RESTART_GAME, this.restartGame.bind(this));
    }

    private OnInvaderDead() {
        this.invadersAlive--;
        if (this.invadersAlive == 0) {
            this.WinGame();
        }
    }
    
    private OnInvaderTouch() {
        this.LoseGame();
    }
    
    private WinGame(){
        if (!this.playing) return;
        this.playing = false;
        Engine.TimeScale = 0;
        this.addResultText(this.winText);
        this.addRestartText();
    }

    private LoseGame() {
        if (!this.playing) return;
        this.playing = false;
        Engine.TimeScale = 0;
        this.addResultText(this.loseText);
        this.addRestartText();
    }

    private addResultText(content: string) {
        const text = new GameResultText("result-text")
        text.content = content;
        Engine.addEntity(text);
    }

    private addRestartText() {
        const text = new RestartText("result-text")
        Engine.addEntity(text);
    }

    private restartGame() {
        Engine.cleanUp();
        Engine.TimeScale = 1;
        this.playing = true;
        this.invadersAlive = this.startingInvaders;
        this.game.start();
    }
}