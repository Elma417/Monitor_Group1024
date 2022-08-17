import getStartTime from '../utils/getStartTime';
import traverseEl from '../utils/traverseEl';
import tracker from '../utils/tracker'
let clsValue = 0;
let sessionValue = 0;
let sessionEntries = [];
let lcpValue = 0;
let fidValues = [];
function FPObserver() {
    if (!window.MutationObserver) {
        return;
    }
    this.startTime = getStartTime();
    this.observerData = [];
    this.observer = new window.MutationObserver(() => {
        const time = Date.now() - this.startTime;
        const body = document.querySelector('body');
        let score = 0;
        if (body) {
            score = traverseEl(body, 1, false);
            this.observerData.push({ score, time });
        } else {
            this.observerData.push({ score: 0, time });
        }
    });
    this.observer.observe(document, { childList: true, subtree: true })
}
FPObserver.prototype.removeSmallScore = function () {
    let { observerData } = this;
    if (observerData.length === 0) return;
    let newData = [observerData[0]];
    for (let i = 1; i < observerData.length; i++) {
        if (observerData[i].score > newData[newData.length - 1].score) {
            newData.push(observerData[i]);
        }
    }
    this.observerData = newData;
}
FPObserver.prototype.getfirstScreenTime = function () {
    let self = this;
    self.removeSmallScore();
    let { observerData } = self;
    let data = null;
    for (let i = 1; i < observerData.length; i++) {
        if (observerData[i].time >= observerData[i - 1].time) {
            const scoreDiffer = observerData[i].score - observerData[i - 1].score;
            if (!data || data.rate <= scoreDiffer) {
                data = { time: observerData[i].time, rate: scoreDiffer };
            }
        }
    }
    if (data && data.time > 0 && data.time < 3600000) {
        return data.time;
    }
    return -1;
}
FPObserver.prototype.unmountObserver = function () {
    let FP = performance.getEntriesByName("first-paint")[0];
    let log = {
        category: 'experience',
        type: 'paint',
        fp: FP ? FP.startTime : 0,
        fcp: this.getfirstScreenTime(),
        lcp: lcpValue,
        cls: clsValue,
        fid: fidValues.length ? fidValues.reduce((a, b) => a + b, 0) / fidValues.length : 0
    }
    tracker.send(log);
    this.observer.disconnect();
    this.observer = null;
}
FPObserver.prototype.init = function () {
    new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
            lcpValue = entry.startTime;
        }
    }).observe({ type: 'largest-contentful-paint', buffered: true });
    new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
            const delay = entry.processingStart - entry.startTime;
            if (delay > 0) fidValues.push(delay);
        }
    }).observe({ type: 'first-input', buffered: true });

    new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
            if (!entry.hadRecentInput) {
                const firstSessionEntry = sessionEntries[0];
                const lastSessionEntry = sessionEntries[sessionEntries.length - 1];
                if (sessionValue &&
                    entry.startTime - lastSessionEntry.startTime < 1000 &&
                    entry.startTime - firstSessionEntry.startTime < 5000) {
                    sessionValue += entry.value;
                } else {
                    sessionValue = entry.value;
                    sessionEntries = [entry];
                }
                if (sessionValue > clsValue) {
                    clsValue = sessionValue;
                }
            }
        }
    }).observe({ type: 'layout-shift', buffered: true });
}
export default FPObserver;




