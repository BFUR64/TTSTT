// @ts-check

import { Events } from "../events.js";

/** @type {number} */
const DEFAULT = 100;

/** @type {number} */
let volume = DEFAULT;

/**
 * @param {number} value
 */
export function setVolume(value) {
    volume = value;
    dispatchEvent();
}

/**
 * @returns {number}
 */
export function getVolume() {
    return volume;
}

/**
 * @returns {number}
 */
export function getDefaultVolume() {
    return DEFAULT;
}

function dispatchEvent() {
    document.dispatchEvent(new CustomEvent(Events.VOLUME_CHANGE, {
        detail: {
            volume
        }
    }));
}
