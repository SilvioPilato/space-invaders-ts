import { Entity } from "../2gong/src/Entity";
import { GameChannel } from "./GameChannel";
import { KeyboardHandler } from "../2gong/src/KeyboardHandler";
import { TextComponent } from "../2gong/src/TextComponent";
import { MUST_RESTART_GAME } from "./Events";

export class RestartText extends Entity {
    private textRender ?: TextComponent;
	private font = 'pixel-lcd-7';
    private size = 20;
    public content = "PRESS SPACE TO RESTART";
	setup(): void {
		this.textRender = new TextComponent();	
		this.renderComponent = this.textRender;
		this.textRender.content = this.content;
		this.textRender.font = this.font;
        this.textRender.size = this.size;
        this.position = {
            x: 245,
            y: 300,
        }
	}

    update(): void {
        if (KeyboardHandler.isPressed("Space")) {
            GameChannel.EventTarget.dispatchEvent(new CustomEvent(MUST_RESTART_GAME));
        } 
    }
}