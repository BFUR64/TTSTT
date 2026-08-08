from pathlib import Path

from fastapi import APIRouter, HTTPException, status
from fastapi.responses import StreamingResponse
import numpy as np
from piper import PiperVoice, SynthesisConfig
from pydantic import BaseModel

from ttstt.routes import voices

BASE_DIR = Path(__file__).parents[1]

router = APIRouter()

class AudioSegment(BaseModel):
    text: str
    selectedVoice: str

syn_config = SynthesisConfig(
    volume=1, # loudness
    length_scale=1.25, # twice as slow
    noise_scale=1.0, # more audio variation
    noise_w_scale=1.0, # more speaking variation
    normalize_audio=False, # use raw audio from voice
)

voiceSelected = None
voice = None

@router.post("/api/model/synthesize")
async def synthesize(audio_segment: AudioSegment):
    global voiceSelected, voice

    if (voiceSelected != audio_segment.selectedVoice):
        print(f"Model is different! Loading model {audio_segment.selectedVoice}...")

        voice_list = voices.get_voice_list()

        if audio_segment.selectedVoice in voice_list:
            new_voice = PiperVoice.load(
                str(BASE_DIR / "model" / f"{audio_segment.selectedVoice}.onnx")
            )
        else:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
            )

        voice = new_voice
        voiceSelected = audio_segment.selectedVoice

    print("Generating audio data...")
    return StreamingResponse(
        generate(voice, audio_segment.text, syn_config),
        media_type="application/octet-stream",
        headers={
            "X-Sample-Rate": str(voice.config.sample_rate),
            "X-Sample-Width": "2",
            "X-Channels": "1",
        }
    )

def generate(voice, text, config):
    for chunk in voice.synthesize(text, config):
        pcm = (chunk.audio_float_array * 32767).astype(np.int16)
        yield pcm.tobytes()
