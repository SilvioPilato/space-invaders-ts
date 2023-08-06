import { Entity } from "./../2gong/src/Entity";
import { TextComponent } from "./../2gong/src/TextComponent";

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