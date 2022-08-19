let lastEvent;

["click", "touchstart", "mousedown", "keydown", "mouseover"].forEach(
    (eventType) => {
        document.addEventListener(eventType, (event) => {
            lastEvent = event;
        },
            {
                capture: true,
                passive: true,
            }
        );
    }
);

export default function getLastEvent() {
    return lastEvent;
}