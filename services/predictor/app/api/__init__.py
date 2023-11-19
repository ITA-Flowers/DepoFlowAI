from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .__meta import (TITLE,
                    DESCRIPTION,
                    VERSION,
                    TAGS_METADATA)

from .routes import db_router, offers_router

def init_api() -> FastAPI:
    api = FastAPI(
        title=TITLE,
        description=DESCRIPTION,
        version=VERSION,
        openapi_tags=TAGS_METADATA
    )

    # origins = [
    #     "client",
    #     "172.20.0.1",
    # ]
    
    api.add_middleware(
        CORSMiddleware,
        allow_credentials=True,
        allow_origins=["*"],
        allow_methods=["*"],
        allow_headers=["*"],
    )
    api.include_router(db_router)
    api.include_router(offers_router)
    
    return api