// @ts-check

import * as transcriberController from "../controller/transcriberController.js";
import { Events } from "../events.js";

/**
 * @param {HTMLButtonElement} cancelButton
 */
export function initCancelButtonUI(cancelButton) {
    cancelButton.addEventListener('click', () => {
        transcriberController.cancelUpload();
    })

    document.addEventListener(Events.TRANSCRIBER_IDLE, () => {
        cancelButton.disabled = true;
    });

    document.addEventListener(Events.TRANSCRIBER_UPLOAD, () => {
        cancelButton.disabled = false;
    });
}
