from fastapi import FastAPI

from .__meta import (TITLE,
                    DESCRIPTION,
                    VERSION,
                    TAGS_METADATA)

from .routes import db_router, offers_router, points_router

def init_api() -> FastAPI:
    api = FastAPI(
        title=TITLE,
        description=DESCRIPTION,
        version=VERSION,
        openapi_tags=TAGS_METADATA
    )
    
    api.include_router(db_router)
    api.include_router(offers_router)
    api.include_router(points_router)
    
    return api