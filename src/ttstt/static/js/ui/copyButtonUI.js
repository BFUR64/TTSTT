// @ts-check

import { Events } from "../events.js";
import * as textState from "../state/textState.js";
import * as toast from "../utils/toast.js";

/** @typedef {import("../events.js").TextChange} TextChange */

/**
 * @param {HTMLButtonElement} copyButton
 */
export function initCopyButtonUI(copyButton) {
    copyButton.addEventListener('click', () => {
        navigator.clipboard.writeText(textState.getText()).catch(() => {
            toast.showToast("Failed to copy");
        })
    });

    document.addEventListener(Events.TEXT_CHANGE, (event) => {
        const customEvent = /** @type {TextChange} */ (event);
        copyButton.disabled = customEvent.detail.text.length <= 0;
    })
}
