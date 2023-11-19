from sqlalchemy.orm import Session

from ..models import tables as models
from ..models import schemas


def get_offers(db : Session, skip : int = 0, limit : int = 100):
    return db.query(models.Offer).offset(skip).limit(limit).all()

def get_offer(db : Session, offer_id : int):
    return db.query(models.Offer).filter(models.Offer.id == offer_id).first()

def create_offer(db : Session, offer : schemas.OfferCreate):
    new_offer = models.Offer(
        bankId_FK=offer.bank_id,
        clientId_FK=offer.client_id,
        productTypeId_FK=offer.product_type_id,
        offerTypeId_FK=offer.offer_type_id,
        percentage=offer.percentage,
        time=offer.time,
        limit=offer.limit,
        name=offer.name
    )
    
    db.add(new_offer)
    db.commit()
    db.refresh(new_offer)
    print(new_offer)
    return new_offer

def delete_offer(db : Session, db_offer : models.Offer):
    db.delete(db_offer)
    db.commit()
    return db_offer