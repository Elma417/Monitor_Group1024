import addEvent from "../utils/addEvent";
import tracker from "../utils/tracker";
import getLastEvent from "../utils/getLastEvent";
import getSelector from "../utils/getSelector";
import traverseEl from "../utils/traverseEl";
function sendWhiteScreeNode(log) {
	log.type = "whiteScreen";
	log.path = location.pathname;
	log.hash = location.hash;
	tracker.send(log);
}
export default function ErrorObserver() {
	addEvent(
		window,
		"error",
		(event) => {
			let lastEvent = getLastEvent();
			if (event.target && (event.target.src || event.target.href)) {
				let log = {
					category: "stability",
					type: "error",
					errorType: "resourceError",
					filename: event.target.src || event.target.href,
					tagName: event.target.tagName.toLowerCase(),
					selector: getSelector(event.target),
				};
				tracker.send(log);
				let score = traverseEl(document.body, 1, false);
				if (score < 50) {
					sendWhiteScreeNode(log);
				}
			} else {
				let log = {
					category: "stability",
					type: "error",
					errorType: "jsError",
					message: event.message,
					filename: event.filename,
					position: `${event.lineno}:${event.colno}`,
					stack: getLines(event?.error?.stack),
					selector: lastEvent ? getSelector(lastEvent.path) : "",
				};
				tracker.send(log);
				let score = traverseEl(document.body, 1, false);
				if (score < 50) {
					sendWhiteScreeNode(log);
				}
			}
		},
		true
	);
	addEvent(
		window,
		"unhandledrejection",
		(event) => {
			let lastEvent = getLastEvent();
			let message;
			let filename;
			let line = 0;
			let column = 0;
			let stack = "";
			let reason = event.reason;
			if (typeof reason === "string") {
				message = reason;
			} else if (typeof reason === "object") {
				message = reason.message;
				if (reason.stack) {
					let matchResult = reason.stack.match(/at\s+(.+):(\d+):(\d+)/);
					filename = matchResult[1];
					line = matchResult[2];
					column = matchResult[3];
				}
				stack = getLines(reason.stack);
			}
			let log = {
				category: "stability",
				type: "error",
				errorType: "promiseError",
				message,
				filename,
				position: `${line}:${column}`,
				stack,
				selector: lastEvent ? getSelector(lastEvent.path) : "",
			};
			tracker.send(log);
			let score = traverseEl(document.body, 1, false);
			if (score < 20) {
				sendWhiteScreeNode(log);
			}
		},
		true
	);
}
function getLines(stack) {
	return stack
		? stack
				.split("\n")
				.slice(1)
				.map((item) => item.replace(/(\().*?(\))/, "").trim())
				.join("\n")
		: "";
}
