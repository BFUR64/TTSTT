from fastapi import APIRouter

router = APIRouter()

# TODO Replace with an actual search algo for voices
@router.get("/api/model/voices")
async def get_voice_models():
    return {"voices": [
        "lessac-1low",
        "lessac-2medium",
        "lessac-3high",
        "ljspeech-2medium",
        "ljspeech-3high",
    ]}
