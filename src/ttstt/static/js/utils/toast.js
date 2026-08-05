// @ts-check

import * as thread from "./thread.js";

/** @type {!HTMLElement} */
let container;

/** @type {!HTMLElement} */
let messageBox;

/** @type {?number} */
let toastTimer = null;

/**
 * @param {HTMLElement} lContainer
 * @param {HTMLElement} lMessageBox
 */
export function initToast(lContainer, lMessageBox) {
    container = lContainer;
    messageBox = lMessageBox;

    container.classList.add("is-hidden");
}

/**
 * @param {string} message
 * @param {string} error
 * @param {number} duration
 */
export async function showToast(message, error = "error",duration = 3000) {
    if (toastTimer) {
        hideToast();
        await thread.sleep(200);
    }

    messageBox.textContent = message;
    container.classList.remove("is-hidden");

    if (error === "error") {
        container.classList.add("is-error");
    }
    else if (error === "info") {
        container.classList.add("is-information");
    }

    toastTimer = /** @type {number} */ setTimeout(() => {
        hideToast();
    }, duration)
}

export function closeToast() {
    if (toastTimer) {
        hideToast();
    }
}

function hideToast() {
    if (toastTimer) clearTimeout(toastTimer);

    container.classList.add("is-hidden");
    container.classList.remove("is-error");
    container.classList.remove("is-information");

    toastTimer = null;
}
