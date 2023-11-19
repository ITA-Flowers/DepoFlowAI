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
    tags=["Offers"],
    prefix="/api/db"
)


@router.get(path="/offers/{offer_id}", 
            response_model=schemas.Offer,
            status_code=status.HTTP_200_OK,
            description="Pobranie danych oferty o danym id",
            response_description="Bank found",
            responses={
                 404: {
                    "model": schemas.ErrorResponseDefault,
                    "description": "Error : Offer not found",
                    "content": {
                        "application/json": {
                            "example": {"detail": "Offer not found!"}
                        }
                    },
                }
             })
def read_offer(offer_id : int, db : Session = Depends(get_db_session)):
    db_obj = crud.get_offer(db, offer_id=offer_id)
    if db_obj is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Offer not found!"
        )
    return db_obj

@router.get(path="/offers",
            response_model=list[schemas.Offer],
            status_code=status.HTTP_200_OK,
            description="Pobranie wszystkich ofert ze stronicowaniem.", 
            response_description="Offers list")
def read_offers(skip : int = 0, limit : int = 100, db : Session = Depends(get_db_session)):
    objs = crud.get_offers(db, skip=skip, limit=limit)
    return objs

@router.post(path="/offers",
             response_model=schemas.Offer,
             status_code=status.HTTP_201_CREATED,
             description="Dodanie nowej oferty", 
             response_description="Created offer entity",
             responses={
                 400: {
                    "model": schemas.ErrorResponseDefault,
                    "description": "Error : Object already exists",
                    "content": {
                        "application/json": {
                            "example": {"detail": "Object already exists!"}
                        }
                    },
                }
             })
def create_offer(offer : schemas.OfferCreate, db : Session = Depends(get_db_session)):
    if not crud.get_bank(db, offer.bank_id):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Bank with id({offer.bank_id}) does not exists!"
        )
    if not crud.get_client(db, offer.client_id):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Bank with id({offer.client_id}) does not exists!"
        )
    if not crud.get_product_type(db, offer.product_type_id):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Product type with id({offer.product_type_id}) does not exists!"
        )
    if not crud.get_offer_type(db, offer.offer_type_id):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Offer type with id({offer.offer_type_id}) does not exists!"
        )
        
    return crud.create_offer(db, offer=offer)

@router.delete(path='/offers/{offer_id}',
               status_code=status.HTTP_200_OK,
               description="Usunięcie oferty o danym ID",
               response_model=schemas.Bank, 
               response_description="Offer successfully deleted",
               responses={
                    404: {
                       "model": schemas.ErrorResponseDefault,
                       "description": "Error : Offer not found",
                       "content": {
                           "application/json": {
                               "example": {"detail": "Offer not found!"}
                           }
                       },
                   }
                })
def delete_offer(offer_id : int, db : Session = Depends(get_db_session)):
    db_obj = crud.get_offer(db, offer_id=offer_id)
    if db_obj is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Offer not found!"
        )
    return crud.delete_offer(db, db_offer=db_obj)
