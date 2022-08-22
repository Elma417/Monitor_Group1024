import addEvent from "../utils/addEvent";
import tracker from "../utils/tracker";
function initPvObserver(enableSPA) {
	if (!enableSPA) return;
	if (enableSPA === "history") {
		let history = window.history;
		let onpopstate = () => {
			sendPv(location.pathname, location.hash ? location.hash.slice(1) : "");
		};
		addEvent(window, "popstate", onpopstate, true);
		let pushState = history.pushState;
		let replaceState = history.replaceState;
		history.pushState = function (...args) {
			let path = args[2]
				? args[2].startsWith("#")
					? args[2].slice(1)
					: args[2]
				: "";
			sendPv(path, "");
			pushState.apply(history, args);
		};
		history.replaceState = function (...args) {
			let path = args[2]
				? args[2].startsWith("#")
					? args[2].slice(1)
					: args[2]
				: "";
			sendPv(path, "");
			replaceState.apply(history, args);
		};
	}
	if (enableSPA === "hash") {
		let onHashChange = function () {
			sendPv(location.pathname, location.hash ? location.hash.slice(1) : "");
		};
		addEvent(window, "hashchange", onHashChange, false);
	}
}

export function sendPv(path, hash) {
	let connection = navigator.connection;
	let log = {
		category: "business",
		type: "pv",
		effectiveType: connection.effectiveType,
		screen: `[${window.screen.width},${window.screen.height}]`,
		rtt: connection.rtt,
		path: path ? path : "",
		hash: hash ? hash : "",
	};
	tracker.send(log);
}
export default function PVObserver(enableSPA) {
	initPvObserver(enableSPA);
	let startTime = Date.now();
	let isLeave = true;

	addEvent(window, "load", () => {
		sendPv(location.pathname, location.hash ? location.hash.slice(1) : "");
	});
	addEvent(window, "unload", () => {
		if (!isLeave) {
			let log = {
				category: "business",
				type: "stayTime",
				stayTime: Date.now() - startTime,
			};
			tracker.send(log);
		}
	});
	// visibilitychange 替代 load
	let hiddenTime = Date.now();
	const handleVisibilityChange = () => {
		let visibleTimer = null;
		let limit = 1000 * 60 * 10; // 用户如果离开页面超过3min，再次有效返回时会发送pv
		let leaveTimer = null;

		return function () {
			// 用户打开或回到页面
			if (document.visibilityState === "visible") {
				leaveTimer && clearTimeout(leaveTimer);
				if (isLeave) {
					startTime = Date.now();
					// 用户在当前页面停留3s以上，才算是有效pv
					visibleTimer && clearTimeout(visibleTimer);
					visibleTimer = setTimeout(() => {
						sendPv(
							location.pathname,
							location.hash ? location.hash.slice(1) : ""
						);
						isLeave = false;
					}, 3000);
				}
			}

			// 用户离开了当前页面
			if (document.visibilityState === "hidden") {
				visibleTimer && clearTimeout(visibleTimer);
				if (!isLeave) {
					hiddenTime = Date.now();
					leaveTimer && clearTimeout(leaveTimer);
					// 超出limit,判定为离开页面
					leaveTimer = setTimeout(() => {
						isLeave = true;
						let log = {
							category: "business",
							type: "stayTime",
							stayTime: hiddenTime - startTime,
						};
						tracker.send(log);
					}, limit);
				}
			}
		};
	};
	addEvent(document, "visibilitychange", handleVisibilityChange(), false);
}
