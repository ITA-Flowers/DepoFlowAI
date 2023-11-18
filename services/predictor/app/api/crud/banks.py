from sqlalchemy.orm import Session

from ..models import tables as models


def get_banks(db : Session, skip : int = 0, limit : int = 100):
    return db.query(models.Bank).offset(skip).limit(limit).all()

def get_bank(db : Session, bank_id : int):
    return db.query(models.Bank).filter(models.Bank.id == bank_id).first()
