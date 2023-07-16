export class KeyboardHandler {
	constructor(anchor = window){
		KeyboardHandler._inputSink = new Set<string>();
		anchor.addEventListener("keydown", (event) => {
			KeyboardHandler._inputSink.add(event.code);
		})
		anchor.addEventListener("keyup", (event) => {
			KeyboardHandler._inputSink.delete(event.code);
		})
	}
	private static _inputSink: Set<string>;

	static isPressed(keyCode: string) {
		return KeyboardHandler._inputSink.has(keyCode);
	}
}
