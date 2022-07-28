
import getUUID from "./getUUID";
function sendByBeacon(logUrl, params) {
    navigator.sendBeacon(logUrl, JSON.stringify(params));
}

function sendByImg(logUrl, params) {
    var img = new Image();
    img.onload = img.onerror = function () {
        img.onload = img.onerror = null;
        img = null;
    };
    img.src = `${logUrl}?params=${JSON.stringify(params)}`
}
function Tracker() {
    this.logUrl = null;
    this.send = function (params) {
        params.uuid = getUUID();
        if (navigator.sendBeacon) {
            sendByBeacon(this.logUrl, params)
        } else {
            sendByImg(this.logUrl, params)
        }
    };
    this.setUrl = (url) => {
        this.logUrl = url;
    }
}
export default new Tracker();


