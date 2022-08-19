import tracker from "./utils/tracker";
import PaintObserver from "./lib/PaintObserver";
import ErrorObserver from "./lib/ErrorObserver";
import XHRObserver from "./lib/XHRObserver";
import PVObserver from "./lib/PVObserver";
import TimingObserver from "./lib/TimingObserver";
import addEvent from "./utils/addEvent";
import { sendPv as $sendPv } from "./lib/PVObserver";
const Monitor = function (config) {
    let { path, onError, onPaint, onPV, onXHR, onTiming, enableSPA } = config;
    if (!path) {
        throw new Error('Upload interface is required.')
    }
    tracker.setUrl(path);
    if (onError === undefined || onError) {
        ErrorObserver();
    }
    if (onPaint === undefined || onPaint) {
        let pob = new PaintObserver();
        pob.init();
        let handler = () => {
            pob.unmountObserver();
        }
        setTimeout(handler, 60000);
        addEvent(window, 'beforeunload', handler)
    }
    if (onTiming === undefined || onTiming) {
        let tmb = new TimingObserver();
        let handler = () => {
            tmb.init()
            tmb.send()
        }
        addEvent(window, 'beforeunload', handler)
        setTimeout(handler, 30000)
    }
    if (onPV === undefined || onPV) {
        PVObserver(enableSPA)
    }
    if (onXHR === undefined || onXHR) {
        XHRObserver()
    }
}
if (window) {
    window.Monitor = Monitor;
    window.sendPv = $sendPv;
}
export const sendPv = $sendPv;
export default Monitor;





