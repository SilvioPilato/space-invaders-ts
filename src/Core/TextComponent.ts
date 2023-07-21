import { Entity } from "./Entity";
import { RenderComponent } from "./Renderer";
export class TextComponent implements RenderComponent {
	private _content: string = "";
	private _color: string = "white";
	private _font: string = "Arial";
	private _size: number = 18;
	
	public get size(): number {
		return this._size;
	}
	public set size(value: number) {
		this._size = value;
	}

	public get font(): string {
		return this._font;
	}
	public set font(value: string) {
		this._font = value;
	}

	public get color(): string {
		return this._color;
	}
	public set color(value: string) {
		this._color = value;
	}

	public get content(): string {
		return this._content;
	}
	public set content(value: string) {
		this._content = value;
	}

	render(entity: Entity, context: CanvasRenderingContext2D) {
		let swapStyle = context.fillStyle;
		let swapFont = context.font;
		context.fillStyle = this.color;
		context.font = `${this.size}px ${this.font}`; 
		
		context.fillText(this.content, entity.position.x, entity.position.y);
		
		context.fillStyle = swapStyle;
		context.font = swapFont;
	}	
}
