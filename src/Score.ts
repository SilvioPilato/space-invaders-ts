import { Entity } from '../2gong/src/Entity';
import { TextComponent } from "../2gong/src/TextComponent"
import { GameChannel } from './GameChannel';
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
	}
}
