export default function (target, eventName, callback, flag) {
    let listener = target[`on${eventName}`];
    if (typeof listener === 'function') {
        target.addEventListener(eventName, (...args) => {
            listener.apply(target, args);
            callback(target, args);
        }, flag)
    } else {
        target.addEventListener(eventName, callback, flag)
    }
}