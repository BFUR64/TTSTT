// @ts-check

import * as volumeController from "../controller/volumeController.js";
import * as volumeState from "../state/volumeState.js";

import { Events } from "../events.js";

/** @typedef {import("../events.js").VolumeChange} VolumeChange */

/** @type {string} */
const VOLUME_ON = `
<svg
    viewBox="0 0 24 24"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="no-fill"
>
    <path d="M15 8a5 5 0 0 1 0 8" />
    <path d="M17.7 5a9 9 0 0 1 0 14" />
    <path d="M6 15h-2a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1h2l3.5 -4.5a.8 .8 0 0 1 1.5 .5v14a.8 .8 0 0 1 -1.5 .5l-3.5 -4.5" />
</svg>`;

/** @type {string} */
const VOLUME_OFF = `
<svg
  viewBox="0 0 24 24"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
  class="no-fill"
>
  <path d="M15 8a5 5 0 0 1 1.912 4.934m-1.377 2.602a5 5 0 0 1 -.535 .464" />
  <path d="M17.7 5a9 9 0 0 1 2.362 11.086m-1.676 2.299a9 9 0 0 1 -.686 .615" />
  <path d="M9.069 5.054l.431 -.554a.8 .8 0 0 1 1.5 .5v2m0 4v8a.8 .8 0 0 1 -1.5 .5l-3.5 -4.5h-2a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1h2l1.294 -1.664" />
  <path d="M3 3l18 18" />
</svg>`;

/**
 * @param {HTMLButtonElement} volumeButton
 * @param {HTMLInputElement} volumeInput
 * @param {HTMLInputElement} volumeSlider
 */
export function initVolumeUI(volumeButton, volumeInput, volumeSlider) {
    volumeButton.addEventListener('click', () => {
        volumeController.invertVolume();
    });

    volumeInput.addEventListener('input', () => {
        volumeController.setVolume(volumeInput.value);
    });

    volumeSlider.addEventListener('input', () => {
        volumeController.setVolume(volumeSlider.value);
    });

    document.addEventListener(Events.VOLUME_CHANGE,  (event) => {
        const customEvent = /** @type {VolumeChange} */ (event);
        const value = customEvent.detail.volume;
        updateVolumeUI(value);
    });

    /** @param {number} volume */
    function updateVolumeUI(volume) {
        volumeInput.value = String(volume);
        volumeSlider.value = String(volume);

        volumeButton.innerHTML = volume === 0
            ? VOLUME_OFF
            : VOLUME_ON;
    }

    /** @type {number} */
    const min = volumeController.getMin();

    /** @type {number} */
    const max = volumeController.getMax();

    /** @type {number} */
    const step = volumeController.getStep();

    setupInput(volumeInput);
    setupInput(volumeSlider);

    /**
     * @param {HTMLInputElement} element
     */
    function setupInput(element) {
        element.min = String(min);
        element.max = String(max);
        element.step = String(step);
    }

    updateVolumeUI(volumeState.getVolume());
}
