import tracker from "../utils/tracker";
export default function TimingObserver() {
    this.log = {
        category: 'experience',
        type: 'timing'
    };
};
TimingObserver.prototype.init = function () {
    let {
        domainLookupEnd,
        domainLookupStart,
        connectEnd,
        connectStart,
        responseEnd,
        responseStart,
        domComplete,
        domInteractive,
        requestStart,
        secureConnectionStart,
    } = performance.timing;
    this.log.DNSLookup = domainLookupEnd - domainLookupStart;
    this.log.TCPConnect = connectEnd - connectStart
    this.log.SSLConnect = connectEnd - secureConnectionStart;
    this.log.requestCost = responseEnd - requestStart
    this.log.responseCost = responseEnd - responseStart;
    this.log.DOMReady = domComplete - domInteractive;
}
TimingObserver.prototype.send = function () {
    tracker.send(this.log)
}

