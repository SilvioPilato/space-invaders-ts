export class GameChannel {
    private static _eventTarget: EventTarget = new EventTarget();
    public static get EventTarget(): EventTarget {
        return GameChannel._eventTarget;
    } 
}
