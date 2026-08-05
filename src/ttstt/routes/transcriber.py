import os
import platform
import subprocess
import tempfile
from io import BytesIO

from fastapi import APIRouter, UploadFile, File
from pydub import AudioSegment

from pathlib import Path

BASE_DIR = Path(__file__).parents[1]


router = APIRouter()

def get_parakeet_type():
    if (platform.system() == "Windows"):
        return "parakeet-cli.exe"
    elif (platform.system() == "Linux"):
        return "parakeet-cli"
    else:
        ""

parakeet = get_parakeet_type()

@router.post("/api/upload/audio/recorded")
async def recorded_audio(audio: UploadFile = File(...)):
    contents = await audio.read()

    temp_audio = tempfile.NamedTemporaryFile(suffix=".wav", delete=False)
    temp_audio.close()

    try:
        audio_segment = AudioSegment.from_file(BytesIO(contents))
        audio_segment = audio_segment.set_frame_rate(16000).set_channels(1)
        audio_segment.export(temp_audio.name, format="wav")

        print(str(BASE_DIR / parakeet))
        print(str(BASE_DIR / "model" / "tdt_ctc-110m-q8_0.gguf"))

        result = subprocess.run(
            [
                str(BASE_DIR / "parakeet-cli.exe"),
                "transcribe",
                "--model",
                str(BASE_DIR / "model" / "tdt_ctc-110m-q8_0.gguf"),
                "--input",
                temp_audio.name
            ],
            capture_output=True,
            text=True
        )

    finally:
        os.unlink(temp_audio.name)

    return { "text": result.stdout.strip() }
