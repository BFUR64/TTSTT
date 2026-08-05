// @ts-check

import * as toast from "../utils/toast.js";

/**
 * @param {HTMLElement} toastButton
 */
export function initToastButtonUI(toastButton) {
    toastButton.addEventListener('click', () => {
        console.log("Cancelling");
        toast.closeToast();
    })
}
