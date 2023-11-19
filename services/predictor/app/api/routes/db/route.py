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
    tags=["DB"],
    prefix="/api/db"
)

@router.get(path="/banks/{bank_id}", 
            response_model=schemas.Bank,
            status_code=status.HTTP_200_OK,
            description="Pobranie danych podmiotu/banku o danym id",
            response_description="Bank found",
            responses={
                 404: {
                    "model": schemas.ErrorResponseDefault,
                    "description": "Error : Bank not found",
                    "content": {
                        "application/json": {
                            "example": {"detail": "Bank not found!"}
                        }
                    },
                }
             })
def read_bank(bank_id : int, db : Session = Depends(get_db_session)):
    db_obj = crud.get_bank(db, bank_id=bank_id)
    if db_obj is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Bank not found!"
        )
    return db_obj

@router.get(path="/banks",
            response_model=list[schemas.Bank],
            status_code=status.HTTP_200_OK,
            description="Pobranie wszystkich podmiotów ze stronicowaniem.", 
            response_description="Bank list")
def read_banks(skip : int = 0, limit : int = 100, db : Session = Depends(get_db_session)):
    objs = crud.get_banks(db, skip=skip, limit=limit)
    return objs


@router.get(path="/clients/{client_id}",
            response_model=schemas.Client,
            status_code=status.HTTP_200_OK,
            description="Pobranie danych klienta o danym id",
            response_description="Client found",
            responses={
                 404: {
                    "model": schemas.ErrorResponseDefault,
                    "description": "Error : Clint not found",
                    "content": {
                        "application/json": {
                            "example": {"detail": "Client not found!"}
                        }
                    },
                }
             })
def read_client(client_id : int, db : Session = Depends(get_db_session)):
    db_obj = crud.get_client(db, client_id=client_id)
    if db_obj is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Client not found!"
        )
    return db_obj

@router.get(path="/clients",
            response_model=list[schemas.Client],
            status_code=status.HTTP_200_OK,
            description="Pobranie wszystkich klientów ze stronicowaniem.", 
            response_description="Clients list")
def read_clients(skip : int = 0, limit : int = 100, db : Session = Depends(get_db_session)):
    objs = crud.get_clients(db, skip=skip, limit=limit)
    return objs


@router.get(path="/offer-types/{offer_type_id}",
            status_code=status.HTTP_200_OK,
            description="Pobranie danych typu oferty o danym id",
            response_model=schemas.OfferType, 
            response_description="Offer type found",
            responses={
                 404: {
                    "model": schemas.ErrorResponseDefault,
                    "description": "Error : Offer type not found",
                    "content": {
                        "application/json": {
                            "example": {"detail": "Offer type not found!"}
                        }
                    },
                }
             })
def read_offer_type(offer_type_id : int, db : Session = Depends(get_db_session)):
    db_obj = crud.get_offer_type(db, offer_type_id=offer_type_id)
    if db_obj is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Offer Type not found!"
        )
    return db_obj

@router.get(path="/offer-types",
            response_model=list[schemas.OfferType],
            status_code=status.HTTP_200_OK,
            description="Pobranie wszystkich typów oferty ze stronicowaniem.", 
            response_description="Offer types list")
def read_offer_types(skip : int = 0, limit : int = 100, db : Session = Depends(get_db_session)):
    objs = crud.get_offer_types(db, skip=skip, limit=limit)
    return objs


@router.get(path="/product-types/{product_type_id}",
            status_code=status.HTTP_200_OK,
            description="Pobranie danych typu produktu o danym id",
            response_model=schemas.ProductType, 
            response_description="Product type found",
            responses={
                 404: {
                    "model": schemas.ErrorResponseDefault,
                    "description": "Error : Product type not found",
                    "content": {
                        "application/json": {
                            "example": {"detail": "Product type not found!"}
                        }
                    },
                }
             })
def read_user(product_type_id : int, db : Session = Depends(get_db_session)):
    db_obj = crud.get_product_type(db, product_type_id=product_type_id)
    if db_obj is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Bank not found!"
        )
    return db_obj

@router.get(path="/product-types", 
            response_model=list[schemas.ProductType],
            status_code=status.HTTP_200_OK,
            description="Pobranie wszystkich typów produktu ze stronicowaniem.", 
            response_description="Product types list")
def read_users(skip : int = 0, limit : int = 100, db : Session = Depends(get_db_session)):
    objs = crud.get_product_types(db, skip=skip, limit=limit)
    return objs