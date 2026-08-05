// @ts-check

import * as textController from "../controller/textController.js";
import { Events } from "../events.js";

/** @typedef {import("../events.js").TextChange} TextChange */

/**
 * @param {HTMLInputElement} textArea
 */
export function initTextUI(textArea) {
    textArea.addEventListener('input', () => {
        textController.setText(textArea.value);
    })

    document.addEventListener(Events.TEXT_CHANGE, (event) => {
        const customEvent = /** @type {TextChange} */ (event);
        textArea.value = customEvent.detail.text;
    })

    document.addEventListener('clear-text-requested', () => {
        textController.clearText();
    })

    textController.setText(textArea.value);
}
