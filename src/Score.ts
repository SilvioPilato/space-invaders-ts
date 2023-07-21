import { Entity } from './Core/Entity';
import { TextComponent } from "./Core/TextComponent"
import { GameChannel } from './Core/GameChannel';
import { INVADER_DOWN } from './Events';
export class Score extends Entity {	
	private currentScore: number = 0;
	private invaderScore = 10;
	private textRender ?: TextComponent;
	private font = 'pixel-lcd-7';
	setup(): void {
		this.textRender = new TextComponent();	
		this.renderComponent = this.textRender;
		this.textRender.content = `Score: ${this.currentScore.toString()}`;
		this.textRender.font = this.font;
		GameChannel.EventTarget.addEventListener(INVADER_DOWN, this.increaseScore.bind(this));
	}

	update(): void {
		if (!this.textRender) return;
		this.textRender.content = `Score: ${this.currentScore.toString()}`;
	}

	increaseScore() {
		this.currentScore+=this.invaderScore;
		console.log(this.currentScore);
	}
}
