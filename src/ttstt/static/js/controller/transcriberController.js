// @ts-check

import * as transcriberService from "../services/transcriberService.js";

export function generateVoice() {
    void transcriberService.generateVoice();
}

export function cancelUpload() {
    transcriberService.cancelUpload();
}
