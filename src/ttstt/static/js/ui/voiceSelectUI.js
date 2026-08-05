// @ts-check

import { Events } from "../events.js";
import * as voiceSelectState from "../state/voiceSelectState.js";

/** @typedef {import("../events.js").VoiceChange} VoiceChange */
/** @typedef {import("../events.js").VoiceSelect} VoiceSelect */

/**
 * @param {HTMLSelectElement} voiceSelectContainer
 */
export function initVoiceSelectUI(voiceSelectContainer) {
    voiceSelectContainer.addEventListener('change', (event) => {
        const select = /** @type {HTMLSelectElement} */ (event.target);
        voiceSelectState.setSelectedVoice(select.value);
    });

    document.addEventListener(Events.VOICE_CHANGE, (event) => {
        const customEvent = /** @type {VoiceChange} */ (event);

        voiceSelectContainer.replaceChildren(
            ...customEvent.detail.voices.map(voice => {
                const option = document.createElement("option");
                option.value = String(voice);
                option.textContent = String(voice);
                return option;
            })
        );
    });

    document.addEventListener(Events.VOICE_SELECT, (event) => {
        const customEvent = /** @type {VoiceSelect} */ (event);
        voiceSelectContainer.value = customEvent.detail.voice;
    });
}
