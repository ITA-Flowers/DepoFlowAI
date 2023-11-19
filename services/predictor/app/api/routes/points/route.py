from fastapi import APIRouter, HTTPException, status, Depends
from sqlalchemy.orm import Session
from datetime import date

import api.crud as crud
from ...models import schemas
from ...models import points


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


@router.post(path="/data",
             response_model=points.PointsResponseModel,
             status_code=status.HTTP_200_OK,
             description="Pobranie danych wykresowych z filtrowaniem.", 
             response_description="Points list")
def read_points(request_model : points.PointsRequestModel, db : Session = Depends(get_db_session)):
    all_offers : list[schemas.Offer] = []
    
    step = 20
    skip = 0
    while True:
        offers = crud.get_offers(db, skip=skip, limit=100)
        if len(offers) == 0:
            break
        for offer in offers:
            all_offers.append(offer)
        skip += step
    
    pts = points.PointsResponseModel()
    
    for offer in all_offers:
        if offer.bank.id in request_model.banks_ids:
            if offer.client.id in request_model.clients_ids:
                if (offer.limit >= request_model.limitRange[0] and offer.limit <= request_model.limitRange[1]):
                    if (offer.percentage >= request_model.interestRange[0] and offer.percentage <= request_model.interestRange[1]):
                        if (offer.time >= request_model.timeRange[0] and offer.time <= request_model.timeRange[1]):
                            
                            if offer.date not in pts.x:
                                pts.x.append(offer.date)
                                
                            if offer.bank.name not in pts.get_bank_names_list():
                                pts.y.append(points.PointsRow(bank_name=offer.bank.name))
                                
                                
                            if request_model.chart_type_id == 1:
                                value = offer.percentage
                            elif request_model.chart_type_id == 2:
                                value = 10
                            
                            index = pts.x.index(offer.date)
                            pts.insert_value(offer.bank.name, index, value)
    
    return pts.model_dump()