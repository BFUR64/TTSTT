// @ts-check

import { Events } from "../events.js";

/** @type {string} */
let text = "";

/**
 * @param {string} value
 */
export function setText(value) {
    text = value;
    dispatchEvent();
}

/**
 * @param {string} value
 */
export function appendText(value) {
    text += value;
    dispatchEvent();
}

/**
 * @returns {string}
 */
export function getText() {
    return text;
}

function dispatchEvent() {
    document.dispatchEvent(new CustomEvent(Events.TEXT_CHANGE, {
        detail: {
            text
        }
    }));
}
