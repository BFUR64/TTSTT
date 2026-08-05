// @ts-check

import { Events } from "../events.js";

/** @type {Array<string>} */
let voices = []

/** @type {string} */
let selectedVoice;

/**
 * @param {string} value
 */
export function setVoice(value) {
    voices = [value];
    dispatchVoicesChangedEvent();
}

/**
 * @param {Array<string>} value
 */
export function setVoices(value) {
    voices = value;
    dispatchVoicesChangedEvent();
}

/**
 * @param {string} value
 */
export function setSelectedVoice(value) {
    selectedVoice = value;
    dispatchSelectVoiceChangedEvent()
}

/**
 * @returns {string}
 */
export function getSelectedVoice() {
    return selectedVoice;
}

function dispatchVoicesChangedEvent() {
    document.dispatchEvent(new CustomEvent(Events.VOICE_CHANGE, {
        detail: {
            voices
        }
    }));
}

function dispatchSelectVoiceChangedEvent() {
    document.dispatchEvent(new CustomEvent(Events.VOICE_SELECT, {
        detail: {
            voice: selectedVoice
        }
    }));
}
