// @ts-check

import * as transcriberService from "../services/transcriberService.js";
import { Events } from "../events.js";

/**
 * @param {HTMLButtonElement} cancelButton
 */
export function initCancelButtonUI(cancelButton) {
    cancelButton.addEventListener('click', () => {
        transcriberService.cancelUpload();
    })

    document.addEventListener(Events.TRANSCRIBER_IDLE, () => {
        cancelButton.disabled = true;
    });

    document.addEventListener(Events.TRANSCRIBER_UPLOAD, () => {
        cancelButton.disabled = false;
    });
}
