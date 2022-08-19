export default function traverseEl(element, layer, identify) {
    const height = window.innerHeight || 0;
    let score = 0;
    const tagName = element.tagName;
    const isCal = tagName !== 'SCRIPT' && tagName !== 'STYLE' && tagName !== 'META' && tagName !== 'HEAD';
    if (isCal) {
        const len = element.children ? element.children.length : 0;
        if (len > 0) {
            for (let children = element.children, i = len - 1; i >= 0; i--) {
                score += traverseEl(children[i], layer + 1, score > 0);
            }
        }
        if (score <= 0 && !identify) {
            if (
                element.getBoundingClientRect &&
                element.getBoundingClientRect().top >= height
            ) {
                return 0;
            }
        }
        score += 1 + 0.5 * layer;
    }
    return score;
}