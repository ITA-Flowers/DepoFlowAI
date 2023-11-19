from sqlalchemy.orm import Session

from ..models import tables as models


def get_offer_types(db : Session, skip : int = 0, limit : int = 100):
    return db.query(models.OfferType).offset(skip).limit(limit).all()

def get_offer_type(db : Session, offer_type_id : int):
    return db.query(models.OfferType).filter(models.OfferType.id == offer_type_id).first()
