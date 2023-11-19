from fastapi import APIRouter, HTTPException, status, Depends
from sqlalchemy.orm import Session
from uuid import UUID

import api.crud as crud
from ...models import schemas


# Dependency
from database import SessionLocal

def get_db_session():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


router = APIRouter(
    tags=["Points"],
    prefix="/api/points"
)


@router.get(path="/chart-types/{chart_type_id}", 
            response_model=schemas.ChartType,
            status_code=status.HTTP_200_OK,
            description="Pobranie typu danych wykresowych o danym id",
            response_description="Bank found",
            responses={
                 404: {
                    "model": schemas.ErrorResponseDefault,
                    "description": "Error : Chart type not found",
                    "content": {
                        "application/json": {
                            "example": {"detail": "Chart type not found!"}
                        }
                    },
                }
             })
def read_chart_type(chart_type_id : int, db : Session = Depends(get_db_session)):
    db_obj = crud.get_chart_type(db, chart_type_id=chart_type_id)
    if db_obj is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Chart type not found!"
        )
    return db_obj

@router.get(path="/chart-types",
            response_model=list[schemas.ChartType],
            status_code=status.HTTP_200_OK,
            description="Pobranie wszystkich typów danych wykresowych ze stronicowaniem.", 
            response_description="Chart types list")
def read_chart_types(skip : int = 0, limit : int = 100, db : Session = Depends(get_db_session)):
    objs = crud.get_chart_types(db, skip=skip, limit=limit)
    return objs
