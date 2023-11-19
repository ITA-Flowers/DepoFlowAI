from sqlalchemy.orm import Session

from ..models import tables as models


def get_chart_types(db : Session, skip : int = 0, limit : int = 100):
    return db.query(models.ChartType).offset(skip).limit(limit).all()

def get_chart_type(db : Session, chart_type_id : int):
    return db.query(models.ChartType).filter(models.ChartType.id == chart_type_id).first()