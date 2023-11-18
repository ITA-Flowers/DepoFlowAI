from sqlalchemy.orm import Session

from ..models import tables as models


def get_product_types(db : Session, skip : int = 0, limit : int = 100):
    return db.query(models.ProductType).offset(skip).limit(limit).all()

def get_product_type(db : Session, product_type_id : int):
    return db.query(models.ProductType).filter(models.ProductType.id == product_type_id).first()
