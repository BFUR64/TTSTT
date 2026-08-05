// @ts-check

import * as transcriberController from "../controller/transcriberController.js";
import { Events } from "../events.js";

/** @type {string} */
const uploading = `
<svg
   viewBox="0 0 24 24"
   stroke="currentColor"
   stroke-width="2"
   stroke-linecap="round"
   stroke-linejoin="round"
   class="no-fill"
>
   <path d="M12 6l0 -3" />
   <path d="M16.25 7.75l2.15 -2.15" />
   <path d="M18 12l3 0" />
   <path d="M16.25 16.25l2.15 2.15" />
   <path d="M12 18l0 3" />
   <path d="M7.75 16.25l-2.15 2.15" />
   <path d="M6 12l-3 0" />
   <path d="M7.75 7.75l-2.15 -2.15" />
</svg>
`;

/**
 * @param {HTMLButtonElement} initSpeakButtonUI
 */
export function initSpeakButtonUI(initSpeakButtonUI) {
    initSpeakButtonUI.addEventListener('click', () => {
        transcriberController.generateVoice();
    })

    document.addEventListener(Events.TRANSCRIBER_IDLE, () => {
        initSpeakButtonUI.disabled = false;
        initSpeakButtonUI.innerHTML = "Speak";
    });

    document.addEventListener(Events.TRANSCRIBER_UPLOAD, () => {
        initSpeakButtonUI.disabled = true;
        initSpeakButtonUI.innerHTML = uploading;
    });
}
