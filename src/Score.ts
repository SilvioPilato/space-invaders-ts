import { Entity } from './Entity';
import { TextComponent } from "./TextComponent"
import { GameChannel } from './channels/GameChannel';
export class Score extends Entity {	
	private currentScore: number = 0;
	private invaderScore = 10;
	private textRender ?: TextComponent;
	setup(): void {
		this.textRender = new TextComponent();	
		this.renderComponent = this.textRender;
		this.textRender.content = `Score: ${this.currentScore.toString()}`;
		this.position.x = 700;
		this.position.y = 32;
		GameChannel.EventTarget.addEventListener("invader-down", this.increaseScore.bind(this));
	}

	update(): void {
		if (!this.textRender) return;
		console.log(this.currentScore);
		this.textRender.content = `Score: ${this.currentScore.toString()}`;
	}

	increaseScore() {
		this.currentScore+=this.invaderScore;
		console.log(this.currentScore);
	}
}
