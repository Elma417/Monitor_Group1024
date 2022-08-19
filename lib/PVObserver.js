import addEvent from "../utils/addEvent";
import tracker from "../utils/tracker";
function initPvObserver() {
    if (!enableSPA) return;
    if (enableSPA === 'history') {
        let history = window.history;
        let onpopstate = () => {
            sendPv(location.pathname, location.hash ? location.hash.slice(1) : '');
        };
        addEvent(window, 'popstate', onpopstate, true);
        let pushState = history.pushState;
        let replaceState = history.replaceState;
        history.pushState = function (...args) {
            let path = args[2] ? args[2].startsWith('#') ? args[2].slice(1) : args[2] : '';
            sendPv(path, '');
            pushState.apply(history, args);
        }
        history.replaceState = function (...args) {
            let path = args[2] ? args[2].startsWith('#') ? args[2].slice(1) : args[2] : '';
            sendPv(path, '');
            replaceState.apply(history, args);
        }
    }
    if (enableSPA === 'hash') {
        let onHashChange = function () {
            sendPv(location.pathname, location.hash ? location.hash.slice(1) : '');
        }
        addEvent(window, 'hashchange', onHashChange, true);
    }
}

export function sendPv(path, hash) {
    let connection = navigator.connection;
    let log = {
        category: 'business',
        type: 'pv',
        effectiveType: connection.effectiveType,
        screen: `[${window.screen.width},${window.screen.height}]`,
        rtt: connection.rtt,
        path: path ? path : '',
        hash: hash ? hash : ''
    }
    tracker.send(log)
}
export default function PVObserver(enableSPA) {
    initPvObserver(enableSPA);
    let startTime = Date.now();
    addEvent(window, 'load', () => {
        sendPv(location.pathname, location.hash ? location.hash.slice(1) : '');
    })
    addEvent(window, 'unload', () => {
        let log = {
            category: 'business',
            type: 'stayTime',
            stayTime: Date.now() - startTime
        }
        tracker.send(log)
    })
};