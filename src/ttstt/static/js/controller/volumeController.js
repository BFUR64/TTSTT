// @ts-check

import * as volumeState from "../state/volumeState.js";

/** @type {number} */
const MIN = 0;

/** @type {number} */
const MAX = 400;

/** @type {number} */
const STEP = 1;

/** @type {number} */
let previousVolume = volumeState.getVolume();

/**
 * @param {string} value
 */
export function setVolume(value) {
    let numVal = /** @type {Number} */ (Number(value));

    if (isNaN(numVal)) return;

    numVal = Math.max(MIN, Math.min(numVal));

    volumeState.setVolume(numVal);
    previousVolume = numVal;
}

export function invertVolume() {
    const currentVolume = volumeState.getVolume();

    if (currentVolume === 0 && previousVolume === 0) {
        volumeState.setVolume(volumeState.getDefaultVolume());
    }
    else if (currentVolume === 0) {
        volumeState.setVolume(previousVolume);
    }
    else {
        previousVolume = currentVolume;
        volumeState.setVolume(0);
    }
}

/**
 * @returns {number}
 */
export function getMin() {
    return MIN;
}

/**
 * @returns {number}
 */
export function getMax() {
    return MAX;
}

/**
 * @returns {number}
 */
export function getStep() {
    return STEP;
}
