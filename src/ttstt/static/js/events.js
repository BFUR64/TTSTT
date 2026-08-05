// @ts-check

/** @enum {string} */
export const Events = {
    TEXT_CHANGE: "text:change",

    VOICE_CHANGE: "voice:change",
    VOICE_SELECT: "voice:select",
    VOICE_LOAD: "voice:load",
    VOICE_RECEIVE: "voice:receive",
    VOICE_ERROR: "voice:error",

    VOLUME_CHANGE: "volume:change",

    RECORDER_IDLE: "recorder:idle",
    RECORDER_RECORD: "recorder:record",
    RECORDER_UPLOAD: "recorder:upload",
    RECORDER_RECEIVE: "recorder:receive",
    RECORDER_RETRY: "recorder:retry",

    TRANSCRIBER_IDLE: "transcriber:idle",
    TRANSCRIBER_UPLOAD: "transcriber:upload",
    TRANSCRIBER_RECEIVE: "transcriber:receive",

    MEDIA_PLAY: "media:play",
    MEDIA_STOP: "media:stop",
    MEDIA_PAUSE: "media:pause"
}

/**
 * @typedef {CustomEvent<TextChangeDetail>} TextChange
 */

/**
 * @typedef {Object} TextChangeDetail
 * @property {string} text
 */



/** @typedef {import("./states").VoiceData} VoiceData */



/**
 * @typedef {CustomEvent<VoiceChangeDetail>} VoiceChange
 */

/**
 * @typedef {Object} VoiceChangeDetail
 * @property {Array<string>} voices
 */



/**
 * @typedef {CustomEvent<VoiceSelectDetail>} VoiceSelect
 */

/**
 * @typedef {Object} VoiceSelectDetail
 * @property {string} voice
 */


/**
 * @typedef {CustomEvent<VoiceReceiveDetail>} VoiceReceive
 */

/**
 * @typedef {Object} VoiceReceiveDetail
 * @property {Array<string>} voices
 */



/**
 * @typedef {CustomEvent<VolumeChangeDetail>} VolumeChange
 */

/**
 * @typedef {Object} VolumeChangeDetail
 * @property {number} volume
 */



/**
 * @typedef {CustomEvent<RecorderReceiveDetail>} RecorderReceive
 */

/**
 * @typedef {Object} RecorderReceiveDetail
 * @property {string} text
 */



/**
 * @typedef {CustomEvent<TranscriberReceiveDetail>} TranscriberReceive
 */

/**
 * @typedef {Object} TranscriberReceiveDetail
 * @property {ArrayBuffer} arrayBuffer
 * @property {number} sampleRate
 */

export {};
