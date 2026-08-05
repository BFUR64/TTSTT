// @ts-check

import { Events } from "../events.js";

/** @typedef {import("../events").TextChange} TextChange */

/**
 * @param {HTMLButtonElement} clearButton
 */
export function initClearButtonUI(clearButton) {
    clearButton.addEventListener('click', () => {
        document.dispatchEvent(new Event('clear-text-requested'));
    })

    document.addEventListener(Events.TEXT_CHANGE, (event) => {
        const customEvent = /** @type {TextChange} */ (event);
        clearButton.disabled = customEvent.detail.text.length <= 0;
    })
}
