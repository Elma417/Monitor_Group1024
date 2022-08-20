import tracker from "../utils/tracker";
import addEvent from "../utils/addEvent";
function initFeachObsever() {
	let fetch = window.fetch;
	if (!fetch) return;
	let newFetch = function (...args) {
		let start = Date.now();
		let method = args[2] && args[2].method ? args[2].method : "get";
		return fetch(...args).then((data) => {
			tracker.send({
				category: "stability",
				type: "fetch",
				pathname: data.url,
				status: data.status,
				statusText: data.statusText,
				duration: Date.now() - start,
				success: data.ok || data.status < 400,
				method: method ? method : "get",
			});
			return Promise.resolve(data);
		});
	};
	window.fetch = newFetch;
}
export default function XHRObserver() {
	initFeachObsever();
	let XMLHttpRequest = window.XMLHttpRequest;
	let oldSend = XMLHttpRequest.prototype.send;
	let oldOpen = XMLHttpRequest.prototype.open;
	XMLHttpRequest.prototype.open = function (method, url) {
		if (url.indexOf(tracker.logUrl) === -1) {
			this.logData = { method, url: url.split("?")[0] };
		}
		return oldOpen.apply(this, arguments);
	};
	XMLHttpRequest.prototype.send = function () {
		if (this.logData) {
			let startTime = Date.now();
			let handler = (type) => () => {
				let duration = Date.now() - startTime;
				let status = this.status ? this.status : "";
				let statusText = this.statusText ? this.statusText : "";
				let success = status && 200 <= status && status < 400 ? true : false;
				tracker.send({
					category: "stability",
					type: "xhr",
					eventType: type,
					pathname: this.logData.url,
					status,
					statusText,
					duration,
					success,
					method: this.logData.method,
				});
			};
			addEvent(this, "load", handler("load"), false);
			addEvent(this, "error", handler("error"), false);
			addEvent(this, "abort", handler("abort"), false);
		}
		return oldSend.apply(this, arguments);
	};
}
