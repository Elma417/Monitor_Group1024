let expireTime = 1 * 60 * 60 * 1000;
export default function getUUID() {
    let uuid = JSON.parse(localStorage.getItem('uuid_mini_monitor_bqvsisju'));
    if (!uuid) {
        return reStoreUUID();

    }
    let timeRemaining = Date.now() - uuid.time;
    if (timeRemaining < expireTime) {
        return uuid.id;
    } else {
        return reStoreUUID();
    }
}
function reStoreUUID() {
    let uuid = { time: Date.now(), id: Math.random().toString(32).slice(2) + Math.random().toString(32).slice(2) };
    localStorage.setItem('uuid_mini_monitor_bqvsisju', JSON.stringify(uuid));
    return uuid.id;
}