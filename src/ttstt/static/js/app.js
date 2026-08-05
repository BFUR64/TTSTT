// @ts-check

import { initToast } from "./utils/toast.js";
import { initToastButtonUI } from "./ui/toastButtonUI.js";

import { initVolumeUI } from "./ui/volumeUI.js";

import { initTextUI } from "./ui/textUI.js";
import  { initTextController } from "./controller/textController.js";

import { initClearButtonUI } from "./ui/clearButtonUI.js";
import { initCopyButtonUI } from "./ui/copyButtonUI.js";

import { initRecordButtonUI } from "./ui/recordButtonUI.js";

import { initVoiceSelectUI } from "./ui/voiceSelectUI.js";
import { initVoiceSelectController } from "./controller/voiceSelectController.js";
import { initVoiceSelectService } from "./services/voiceSelectService.js";

import { initSpeakButtonUI } from "./ui/speakButtonUI.js";
import { initCancelButtonUI } from "./ui/cancelButtonUI.js";

import { initMediaController } from "./controller/mediaController.js";
import { initMediaUI } from "./ui/mediaUI.js";


// --------- Toast Container ---------
const toastContainer = /** @type {HTMLElement} */ (document.querySelector("#toast"));
const toastMessageBox = /** @type {HTMLElement} */ (document.querySelector("#toast-text-box"));
const toastButton = /** @type {HTMLButtonElement} */ (document.querySelector("#toastButton"));

initToast(toastContainer, toastMessageBox);
initToastButtonUI(toastButton);

// --------- Volume ---------
const volumeButton = /** @type {HTMLButtonElement} */ (document.querySelector("#volumeButton"));
const volumeInput = /** @type {HTMLInputElement} */ (document.querySelector("#volumeInput"));
const volumeSlider = /** @type {HTMLInputElement} */ (document.querySelector("#volumeSlider"));

initVolumeUI(volumeButton, volumeInput, volumeSlider);

// --------- Text Operations ---------
const textInput = /** @type {HTMLInputElement} */ (document.querySelector("#textInput"));

initTextUI(textInput);
initTextController();

const clearButton = /** @type {HTMLButtonElement} */ (document.querySelector("#clearButton"));
const copyButton = /** @type {HTMLButtonElement} */ (document.querySelector("#copyButton"));

initClearButtonUI(clearButton);
initCopyButtonUI(copyButton)

// --------- Recording ---------
const recordButton = /** @type {HTMLButtonElement} */ (document.querySelector("#recordButton"));

initRecordButtonUI(recordButton);

// --------- Generating ---------
const voiceSelectDropdown = /** @type {HTMLSelectElement} */ (document.querySelector("#voiceSelect"));

const speakButton = /** @type {HTMLButtonElement} */ (document.querySelector("#speakButton"));
const cancelButton = /** @type {HTMLButtonElement} */ (document.querySelector("#cancelButton"));

initVoiceSelectUI(voiceSelectDropdown);
initVoiceSelectController();
void initVoiceSelectService(voiceSelectDropdown);

initSpeakButtonUI(speakButton);
initCancelButtonUI(cancelButton);

// --------- Media player ---------
const chunkCounter = /** @type {HTMLElement} */ (document.querySelector("#chunkCounter"));
const previousButton = /** @type {HTMLButtonElement} */ (document.querySelector("#previousButton"));
const playButton = /** @type {HTMLButtonElement} */ (document.querySelector("#playButton"));
const nextButton = /** @type {HTMLButtonElement} */ (document.querySelector("#nextButton"));

initMediaUI(chunkCounter, previousButton, playButton, nextButton);
initMediaController();
