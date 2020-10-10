class EventManager {
	constructor() {
		this.events = {};
	}

	publish = (evName, data) => {
		const handlers = this.events[evName];
		if (!handlers) return;
		handlers.forEach(handler => handler.call(this, data));
	};
	subscribe = (evName, handler) => {
		let handlers = this.events[evName];

		if (!handlers) this.events[evName] = handlers = [];
		handlers.push(handler);
	};
}

const eventManager = new EventManager();
export default eventManager;
