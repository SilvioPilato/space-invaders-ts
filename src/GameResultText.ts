import { Entity } from "./Core/Entity";
import { TextComponent } from "./Core/TextComponent";

export class GameResultText extends Entity {
    private textRender ?: TextComponent;
	private font = 'pixel-lcd-7';
    private size = 36;
    public content = "YOU LOST";
	setup(): void {
		this.textRender = new TextComponent();	
		this.renderComponent = this.textRender;
		this.textRender.content = this.content;
		this.textRender.font = this.font;
        this.textRender.size = this.size;
        this.position = {
            x: 305,
            y: 255,
        }
	}
}