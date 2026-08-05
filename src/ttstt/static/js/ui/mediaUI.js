// @ts-check

import * as mediaController from "../controller/mediaController.js";
import { Events } from "../events.js";

/** @type {string} */
const playerPlay = `
<svg viewBox="0 0 24 24">
   <path d="M6 4v16a1 1 0 0 0 1.524 .852l13 -8a1 1 0 0 0 0 -1.704l-13 -8a1 1 0 0 0 -1.524 .852z" />
</svg>
`;

/** @type {string} */
const playerPause = `
<svg viewBox="0 0 24 24">
   <path d="M9 4h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h2a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2z" />
   <path d="M17 4h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h2a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2z" />
</svg>

`;

/**
 * @param {HTMLElement} chunkCounter
 * @param {HTMLButtonElement} previousButton
 * @param {HTMLButtonElement} playButton
 * @param {HTMLButtonElement} nextButton
 */
export function initMediaUI(chunkCounter, previousButton, playButton, nextButton) {
    document.addEventListener(Events.MEDIA_PLAY, () => {
        enableUI();
    });

    document.addEventListener(Events.MEDIA_STOP, () => {
        disableUI();
    })

    document.addEventListener(Events.MEDIA_PAUSE, () => {
        playButton.innerHTML = playerPlay;
    })

    previousButton.addEventListener('click', () => {
        mediaController.previousAudio();
    })

    playButton.addEventListener('click', () => {
        mediaController.playOrPause();
    })

    nextButton.addEventListener('click', () => {
        mediaController.nextAudio();
    })

    function enableUI() {
        chunkCounter.classList.remove('is-disabled');
        previousButton.disabled = false;
        playButton.disabled = false;
        nextButton.disabled = false;

        playButton.innerHTML = playerPause;
    }

    function disableUI() {
        chunkCounter.classList.add('is-disabled');
        previousButton.disabled = true;
        playButton.disabled = true;
        nextButton.disabled = true;

        playButton.innerHTML = playerPlay;
    }

    disableUI();
}
