// @ts-check

import { Events } from "../events.js";
import * as volumeState from "../state/volumeState.js";

/** @typedef {import("../events").TranscriberReceive} TranscriberReceive */
/** @typedef {import("../events.js").VolumeChange} VolumeChange */

/** @type {?AudioContext} */
let audioContext = null;

/** @type {?PCMPlayer} */
let pcmPlayer = null;

/** @type {?GainNode} */
let gainNode = null;


export function initMediaController() {
    document.addEventListener(Events.TRANSCRIBER_RECEIVE, async (event) => {
        const customEvent = /** @type {TranscriberReceive} */ (event);

        const audioObject = customEvent.detail;

        createAudio(audioObject);
        playOrPause();
    });

    document.addEventListener(Events.VOLUME_CHANGE, (event) => {
        const customEvent = /** @type {VolumeChange} */ (event);

        if (gainNode) {
            gainNode.gain.value = customEvent.detail.volume / 100.0;
        }
    });
}

/**
 * @param {{arrayBuffer: ArrayBuffer, sampleRate: number}} audioObject
 */
function createAudio(audioObject) {
    const { arrayBuffer, sampleRate } = audioObject;

    const pcm16 = new Int16Array(arrayBuffer);
    const float32 = new Float32Array(pcm16.length);

    for (let i = 0; i < pcm16.length; i++) {
        float32[i] = pcm16[i] / 32768;
    }

    if (audioContext == null || gainNode == null) {
        audioContext = new AudioContext();

        gainNode = audioContext.createGain();

        gainNode.connect(audioContext.destination);
        gainNode.gain.value = volumeState.getVolume() / 100;

        pcmPlayer = new PCMPlayer(audioContext, gainNode);
    }

    const audioBuffer = audioContext.createBuffer(
        1,
        float32.length,
        sampleRate
    );

    audioBuffer.copyToChannel(float32, 0);

    pcmPlayer?.setBuffer(audioBuffer);
}

export function playOrPause() {
    if (!pcmPlayer) return;

    if (pcmPlayer.playing) {
        pcmPlayer.pause();
        document.dispatchEvent(new Event(Events.MEDIA_PAUSE));
    }
    else {
        pcmPlayer.play();
        document.dispatchEvent(new Event(Events.MEDIA_PLAY));
    }
}

export function previousAudio() {
    pcmPlayer?.seek(pcmPlayer?.currentTime - 5);
}

export function nextAudio() {
    pcmPlayer?.seek(pcmPlayer?.currentTime + 5);
}

class PCMPlayer {
    /**
     * @param {AudioContext} audioContext
     * @param {GainNode} gainNode
     */
    constructor(audioContext, gainNode) {
        this.audioContext = audioContext;
        this.gainNode = gainNode;

        this.buffer = null;
        this.source = null;
        this.offset = 0;
        this.startedAt = 0;
        this.playing = false;
    }

    /**
     * @param {AudioBuffer} buffer
     */
    setBuffer(buffer) {
        this.pause();

        this.buffer = buffer;
        this.offset = 0;
    }

    async play() {
        if (!this.buffer || this.playing) return;

        await this.audioContext.resume();

        this.source = this.audioContext.createBufferSource();
        this.source.buffer = this.buffer;
        this.source.connect(this.gainNode);

        this.startedAt = this.audioContext.currentTime - this.offset;

        this.source.onended = () => {
            if (this.stopping) {
                this.stopping = false;
                return;
            }

            this.source = null;
            this.playing = false;
            this.offset = 0;

            document.dispatchEvent(new Event(Events.MEDIA_PAUSE));
        };

        this.source.start(0, this.offset);
        this.playing = true;
    }

    pause() {
        if (!this.source || !this.playing) return;

        this.offset = this.audioContext.currentTime - this.startedAt;

        this.stopping = true;

        this.source.stop();
        this.source = null;

        this.playing = false;
    }

    /**
     * @param {number} time
     */
    seek(time) {
        if (!this.buffer) return;

        const wasPlaying = this.playing;

        if (this.source) {
            this.stopping = true;
            this.source.stop();
            this.source = null;
        }

        this.offset = Math.max(
            0,
            Math.min(time, this.buffer.duration)
        );

        this.playing = false;

        if (wasPlaying) {
            this.play();
        }
    }

    /**
     * @returns {number}
     */
    get currentTime() {
        if (!this.playing) {
            return this.offset;
        }

        return this.audioContext.currentTime - this.startedAt;
    }
}
