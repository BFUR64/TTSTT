// @ts-check

import * as toast from "../utils/toast.js";
import * as thread from "../utils/thread.js";
import { Events } from "../events.js";

/** @type {?MediaRecorder} */
let mediaRecorder = null;

/** @type {?Blob} */
let audioBlob = null;

/** @type {?AbortController} */
let abortController = null;

export async function startRecording() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({audio: true});

        mediaRecorder = /** @type {MediaRecorder} */ (new MediaRecorder(stream));

        /** @type {Array<Blob>} */
        const chunks = [];

        mediaRecorder.ondataavailable = (event) => {
            chunks.push(event.data);
        }

        mediaRecorder.onstop = () => {
            if (mediaRecorder) {
                audioBlob = new Blob(chunks, {
                    type: mediaRecorder.mimeType
                })
            }

            stream.getTracks().forEach(track => track.stop());

            mediaRecorder = null;

            attemptUpload();
        }

        mediaRecorder.start();
        document.dispatchEvent(new Event(Events.RECORDER_RECORD));
    }
    catch (err) {
        console.error(err);
        mediaRecorder = null;
    }
}

export function stopRecording() {
    mediaRecorder?.stop();

}

export function cancelUpload() {
    abortController?.abort();
    abortController = null;
}

export async function attemptUpload() {
    try {
        if (audioBlob) {
            const  result = await uploadRecording(audioBlob);
            document.dispatchEvent(new CustomEvent(Events.RECORDER_RECEIVE, {
                detail: {
                    text: result.text
                }
            }));

            document.dispatchEvent(new Event(Events.RECORDER_IDLE));

            audioBlob = null;
        }
    }
    catch (err) {
        const error = /** @type {Error} */ (err);

        if (error.name === "AbortError") {
            document.dispatchEvent(new Event(Events.RECORDER_IDLE));
            void toast.showToast("Upload cancelled", "info");
            audioBlob = null;
        }
        else {
            document.dispatchEvent(new Event(Events.RECORDER_RETRY));
            void toast.showToast(error.message);
            console.error(error);
        }
    }
}

/**
 * @param {Blob} blob
 * @returns {Promise<Response>}
 */
async function uploadRecording(blob) {
    try {
        const controller = new AbortController();
        abortController = controller;

        document.dispatchEvent(new Event(Events.RECORDER_UPLOAD));

        const formData = new FormData();

        formData.append("audio", blob, "recording.webm");

        const start = performance.now();

        const response = await fetch("/api/upload/audio/recorded", {
            method: "POST",
            body: formData,
            signal: controller.signal
        });

        const end = performance.now() - start;

        if (end < 500) {
            await thread.sleep(500 - end);

            if (controller.signal.aborted) {
                throw new DOMException("Operation aborted", "AbortError");
            }
        }

        if (!response.ok) {
            throw new Error(`Upload failed: ${response.status}`);
        }

        return await response.json();
    }
    finally {
        abortController = null;
    }
}
