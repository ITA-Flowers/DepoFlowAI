from sqlalchemy.orm import Session

from ..models import tables as models
from ..models import schemas


def get_banks(db : Session, skip : int = 0, limit : int = 100):
    return db.query(models.Bank).offset(skip).limit(limit).all()

def get_bank(db : Session, bank_id : int):
    return db.query(models.Bank).filter(models.Bank.id == bank_id).first()

def get_bank_by_name(db : Session, bank_name : str):
    return db.query(models.Bank).filter(models.Bank.name == bank_name).first()

def create_bank(db : Session, bank : schemas.BankCreate):
    new_bank = models.Bank(
        name=bank.name,
        domain=bank.domain
    )
    
    db.add(new_bank)
    db.commit()
    db.refresh(new_bank)
    return new_bank

def delete_bank(db : Session, db_bank : models.Bank):
    db.delete(db_bank)
    db.commit()
    return db_bank