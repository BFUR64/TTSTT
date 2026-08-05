// @ts-check

import * as textState from "../state/textState.js";
import * as voiceSelectState from "../state/voiceSelectState.js";
import * as toast from "../utils/toast.js";
import * as thread from "../utils/thread.js";
import { Events } from "../events.js";

/** @type {?AbortController} */
let abortController = null;

export async function generateVoice() {
    try {
        const { arrayBuffer, sampleRate } = await uploadText();

        document.dispatchEvent(new CustomEvent(Events.TRANSCRIBER_RECEIVE, {
            detail: {
                arrayBuffer,
                sampleRate,
            }
        }));
    }
    catch (err) {
        const error = /** @type {Error} */ (err);

        if (error.name === "AbortError") {
            void toast.showToast("Upload cancelled", "info");
            return;
        }

        void toast.showToast(error.message);
    }
    finally {
        document.dispatchEvent(new Event(Events.TRANSCRIBER_IDLE));
    }
}

export function cancelUpload() {
    abortController?.abort();
    abortController = null;
}

/**
 * @returns {Promise<{arrayBuffer: ArrayBuffer, sampleRate: number}>}
 */
async function uploadText() {
    document.dispatchEvent(new Event(Events.TRANSCRIBER_UPLOAD));

    const text = textState.getText();

    const selectedVoice = voiceSelectState.getSelectedVoice();

    const controller = new AbortController();
    abortController = controller;

    const start = performance.now();

    const response = await fetch("/api/model/synthesize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, selectedVoice }),
        signal: controller.signal
    });

    const elapsed = performance.now() - start;

    if (elapsed < 500) {
        await thread.sleep(500 - elapsed);

        if (controller.signal.aborted) {
            throw new DOMException("Operation aborted", "AbortError");
        }
    }

    if (!response.ok) {
        throw new Error(`Upload failed: ${response.status}`);
    }

    const sampleRate = Number(response.headers.get("X-Sample-Rate"));
    const arrayBuffer = await response.arrayBuffer();

    return { arrayBuffer, sampleRate }
}
