import { data } from "jquery";
import addEvent from "../utils/addEvent";
import tracker from "../utils/tracker";
export function sendPv(path) {
    let connection = navigator.connection;
    let log = {
        category: 'business',
        type: 'pv',
        effectiveType: connection.effectiveType,
        screen: `[${window.screen.width},${window.screen.height}]`,
        rtt: connection.rtt,
        path: path ? path : '',
    }
    tracker.send(log)
}
export default function PVObserver() {
    let connection = navigator.connection;
    let startTime = Date.now();
    addEvent(window, 'load', () => {
        let log = {
            category: 'business',
            type: 'pv',
            effectiveType: connection.effectiveType,//网络环境
            screen: `[${window.screen.width},${window.screen.height}]`,//屏幕分辨率
            rtt: connection.rtt,//往返时间,
            path: location.pathname,
            hash: location.hash ? location.hash.slice(1) : ''
        }
        tracker.send(log)
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