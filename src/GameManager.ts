import { GameChannel } from "./Core/GameChannel";
import { INVADER_DOWN, INVADER_TOUCH } from "./Events";

export class GameManager {
    private invadersAlive = 30;

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
        console.log("YOU WON");
    }
    private LoseGame() {
        console.log("YOU LOST");
    }
    

}