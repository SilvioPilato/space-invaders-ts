export class KeyboardHandler {
	constructor(anchor = window){
		KeyboardHandler.inputHoldSink = new Set<string>();
		KeyboardHandler.inputPressedSink = new Set<string>();
		KeyboardHandler.inputUpSink = new Set<string>();
		anchor.addEventListener("keydown", (event) => {
			if (event.repeat) return;
			KeyboardHandler.inputHoldSink.add(event.code);
			KeyboardHandler.inputPressedSink.add(event.code);
		})
		anchor.addEventListener("keyup", (event) => {
			KeyboardHandler.inputHoldSink.delete(event.code);
			KeyboardHandler.inputUpSink.add(event.code);
		})
	}
	private static inputHoldSink: Set<string>;
	private static inputPressedSink: Set<string>;
	private static inputUpSink: Set<string>;
	
	static isHold(keyCode: string) {
		return KeyboardHandler.inputHoldSink.has(keyCode);
	}

	static isUp(keyCode: string) {
		return KeyboardHandler.inputUpSink.has(keyCode);
	}

	static isPressed(keyCode: string) {
		return KeyboardHandler.inputPressedSink.has(keyCode);
	}

	clear() {
		// this is designed to be called on the post update phase
		KeyboardHandler.inputUpSink.clear();
		KeyboardHandler.inputPressedSink.clear();
	}
}
