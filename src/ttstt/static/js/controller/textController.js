// @ts-check

import { Events } from "../events.js";
import * as textState from "../state/textState.js";

/** @typedef {import("../events.js").RecorderReceive} RecorderReceive */

export function initTextController() {
    document.addEventListener(Events.RECORDER_RECEIVE, (event) => {
        const customEvent = /** @type {RecorderReceive} */ (event);
        textState.appendText(customEvent.detail.text);
    });
}

/**
 * @param {string} value
 */
export function setText(value) {
    textState.setText(value);
}

export function clearText() {
    setText("");
}
