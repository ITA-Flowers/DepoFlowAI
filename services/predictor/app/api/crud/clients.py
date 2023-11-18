from sqlalchemy.orm import Session

from ..models import tables as models


def get_clients(db : Session, skip : int = 0, limit : int = 100):
    return db.query(models.Client).offset(skip).limit(limit).all()

def get_client(db : Session, client_id : int):
    return db.query(models.Client).filter(models.Client.id == client_id).first()
