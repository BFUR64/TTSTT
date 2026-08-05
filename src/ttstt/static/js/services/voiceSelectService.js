// @ts-check

import { Events } from "../events.js";
import * as toast from "../utils/toast.js";

/** @typedef {import("../states.js").VoiceData} VoiceData */

/**
 * @param {HTMLElement} voiceSelectContainer
 */
export async function initVoiceSelectService(voiceSelectContainer) {
    try {
        document.dispatchEvent(new Event(Events.VOICE_LOAD));

        /** @type {Response} */
        const result = (await fetch("/api/model/voices"));

        // TODO Add retry logic
        if (!result.ok) throw new Error(String(result.status));

        /** @type {VoiceData} */
        const data = await result.json();

        document.dispatchEvent(new CustomEvent(Events.VOICE_RECEIVE, {
            detail: {
                voices: data.voices
            }
        }));
    }
    // TODO Refactor during adding retry logic
    catch (err) {
        document.dispatchEvent(new Event(Events.VOICE_ERROR));
        void toast.showToast("Could not load voices: " + /** @type {Error} */ (err).message);
    }
}
