// @ts-check

import { Events } from "../events.js";
import * as voiceSelectState from "../state/voiceSelectState.js";

/** @typedef {import("../events.js").VoiceReceive} VoiceReceive */

export function initVoiceSelectController() {
    document.addEventListener(Events.VOICE_LOAD, () => {
        voiceSelectState.setVoice("Voices loading...");
    })

    document.addEventListener(Events.VOICE_RECEIVE, (event) => {
        const customEvent = /** @type {VoiceReceive} */ (event);

        voiceSelectState.setVoices(customEvent.detail.voices);
        voiceSelectState.setSelectedVoice(customEvent.detail.voices[0]);
    })

    document.addEventListener(Events.VOICE_ERROR, () => {
        voiceSelectState.setVoice("Error loading voices");
    })
}
