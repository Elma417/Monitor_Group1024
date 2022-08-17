import addEvent from "../utils/addEvent";
import tracker from "../utils/tracker";
import getLastEvent from "../utils/getLastEvent";
import getSelector from "../utils/getSelector";
export default function ErrorObserver() {
    addEvent(window, 'error', (event) => {
        let lastEvent = getLastEvent();
        if (event.target && (event.target.src || event.target.href)) {
            tracker.send({
                category: "stability",
                type: "error",
                errorType: "resourceError",
                filename: event.target.src || event.target.href,
                tagName: event.target.tagName.toLowerCase(),
                selector: getSelector(event.target),
            });
        } else {
            tracker.send({
                category: "stability",
                type: "error",
                errorType: "jsError",
                message: event.message,
                filename: event.filename,
                position: `${event.lineno}:${event.colno}`,
                stack: getLines(event.error.stack),
                selector: lastEvent ? getSelector(lastEvent.path) : "",
            })
        }
    }, true)
    addEvent(window,
        "unhandledrejection",
        (event) => {
            let lastEvent = getLastEvent();
            let message;
            let filename;
            let line = 0;
            let column = 0;
            let stack = "";
            let reason = event.reason;
            if (typeof reason === "string") {
                message = reason;
            } else if (typeof reason === "object") {
                message = reason.message;
                if (reason.stack) {
                    let matchResult = reason.stack.match(/at\s+(.+):(\d+):(\d+)/);
                    filename = matchResult[1];
                    line = matchResult[2];
                    column = matchResult[3];
                }
                stack = getLines(reason.stack);
            }
            tracker.send({
                category: "stability",
                type: "error",
                errorType: "promiseError",
                message,
                filename,
                position: `${line}:${column}`,
                stack,
                selector: lastEvent ? getSelector(lastEvent.path) : "",
            });
        },
        true
    );
};
function getLines(stack) {
    return stack.split("\n").slice(1).map((item) => item.replace(/(\().*?(\))/, "").trim()).join("\n");
}
