import { Entity } from "./Core/Entity";
import { TextComponent } from "./Core/TextComponent";

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
}