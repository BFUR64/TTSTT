from pathlib import Path
import time

from fastapi import APIRouter
import wave
from fastapi.responses import StreamingResponse
import numpy as np
from piper import PiperVoice, SynthesisConfig
from pydantic import BaseModel
from io import BytesIO

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

# @router.post("/api/model/synthesize")
# async def synthesize(audio_segment: AudioSegment):
#     print(f"Synthesizing with {audio_segment.selectedVoice}...")
#     start = time.perf_counter()

#     voice = PiperVoice.load(str(BASE_DIR / "model" / f"{audio_segment.selectedVoice}.onnx"))

#     buffer = BytesIO()

#     with wave.open(buffer, "wb") as wav_file:
#         wav_file.setnchannels(1)
#         wav_file.setsampwidth(2)
#         wav_file.setframerate(24000)
#         voice.synthesize_wav(audio_segment.text, wav_file, syn_config=syn_config)

#     buffer.seek(0)

#     end = time.perf_counter()
#     print(f"Done in {end - start:.6f}s")

#     return Response(
#         content=buffer.read(),
#         media_type="audio/wav",
#     )

voiceSelected = None
voice = None

@router.post("/api/model/synthesize")
async def synthesize(audio_segment: AudioSegment):
    global voiceSelected, voice

    if (voiceSelected != audio_segment.selectedVoice):
        print(f"Model is different! Loading model {audio_segment.selectedVoice}...")
        new_voice = PiperVoice.load(
            str(BASE_DIR / "model" / f"{audio_segment.selectedVoice}.onnx")
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
