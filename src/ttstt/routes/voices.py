from pathlib import Path

from fastapi import APIRouter

router = APIRouter()

BASE_DIR = Path(__file__).parents[1]

@router.get("/api/model/voices")
async def get_voice_models():
    return {"voices": [
        f.stem
        for f in Path(BASE_DIR / "model").iterdir()
        if f.is_file() and f.suffix == ".onnx"
    ]}
