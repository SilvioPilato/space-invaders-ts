import { Engine } from "./Core/Engine";
import { GameChannel } from "./Core/GameChannel";
import { INVADER_DOWN, INVADER_TOUCH } from "./Events";
import { GameResultText } from "./GameResultText";
import { RestartText } from "./RestartText";

export class GameManager {
    private invadersAlive = 30;
    private playing = true;
    private winText = "YOU WON";
    private loseText = "YOU LOST";
    constructor(invadersAlive: number) {
        this.invadersAlive = invadersAlive;
        GameChannel.EventTarget.addEventListener(INVADER_DOWN, this.OnInvaderDead.bind(this));
        GameChannel.EventTarget.addEventListener(INVADER_TOUCH, this.OnInvaderTouch.bind(this));
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
}