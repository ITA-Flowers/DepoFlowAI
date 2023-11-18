from fastapi import FastAPI

from .__meta import (TITLE,
                    DESCRIPTION,
                    VERSION,
                    TAGS_METADATA)

from .routes import db_router

def init_api() -> FastAPI:
    api = FastAPI(
        title=TITLE,
        description=DESCRIPTION,
        version=VERSION,
        openapi_tags=TAGS_METADATA
    )
    
    api.include_router(db_router)
    
    return api