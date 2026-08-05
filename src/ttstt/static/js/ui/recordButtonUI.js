// @ts-check

import { Events } from "../events.js";
import * as recorderService from "../services/recorderService.js"

/** @enum {string} */
const States = {
    IDLE: "idle",
    RECORDING: "recording",
    UPLOADING: "uploading",
    RETRY: "retry"
}

/** @enum {string} */
const Icons = {
    IDLE: `
<svg viewBox="0 0 24 24">
    <path d="M19 9a1 1 0 0 1 1 1a8 8 0 0 1 -6.999 7.938l-.001 2.062h3a1 1 0 0 1 0 2h-8a1 1 0 0 1 0 -2h3v-2.062a8 8 0 0 1 -7 -7.938a1 1 0 1 1 2 0a6 6 0 0 0 12 0a1 1 0 0 1 1 -1m-7 -8a4 4 0 0 1 4 4v5a4 4 0 1 1 -8 0v-5a4 4 0 0 1 4 -4" />
</svg>`,

    RECORDING: `
<svg viewBox="0 0 24 24">
    <path d="M7 3.34a10 10 0 1 1 -4.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 4.995 -8.336z" />
</svg>`,

    UPLOADING: `
<svg
    viewBox="0 0 24 24"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
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
`,

    RETRY: `
<svg
    viewBox="0 0 24 24"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="no-fill"
>
    <path d="M19.933 13.041a8 8 0 1 1 -9.925 -8.788c3.899 -1 7.935 1.007 9.425 4.747" />
    <path d="M20 4v5h-5" />
</svg>
`
}

/** @typedef {States} */
let currentState = States.IDLE;

/**
 * @param {HTMLButtonElement} recordButton
 */
export function initRecordButtonUI(recordButton) {
    recordButton.addEventListener('click', () => {
        switch (currentState) {
            case States.IDLE:
                void recorderService.startRecording();
                break;
            case States.RECORDING:
                recorderService.stopRecording();
                break;
            case States.UPLOADING:
                recorderService.cancelUpload();
                break;
            case States.RETRY:
                void recorderService.attemptUpload();
                break;
        }
    });

    document.addEventListener(Events.RECORDER_IDLE, () => {
        recordButton.innerHTML = Icons.IDLE;
        currentState = States.IDLE;
    })

    document.addEventListener(Events.RECORDER_RECORD, () => {
        recordButton.innerHTML = Icons.RECORDING;
        currentState = States.RECORDING;
    })

    document.addEventListener(Events.RECORDER_UPLOAD, () => {
        recordButton.innerHTML = Icons.UPLOADING;
        currentState = States.UPLOADING;
    })

    document.addEventListener(Events.RECORDER_RETRY, () => {
        recordButton.innerHTML = Icons.RETRY;
        currentState = States.RETRY;
    })
}
