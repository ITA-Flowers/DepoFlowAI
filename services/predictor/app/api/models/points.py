from pydantic import BaseModel
from datetime import date


class PointsRequestModel(BaseModel):
    banks_ids : list[int]
    clients_ids : list[int]
    chart_type_id : int
    limitRange : list[int]
    interestRange : list[float] # percentage
    timeRange : list[int]  # months
    
    class Config:
        from_attributes = True

    
class PointsRow(BaseModel):
    bank_name : str
    y : list[float | int | None] = []

    class Config:
        from_attributes = True
        

class PointsResponseModel(BaseModel):
    y : list[PointsRow] = []
    x : list[date] = []
    
    def get_bank_names_list(self) -> list[str]:
        bank_names :list[str] = []
        for v in self.y:
            if v not in bank_names:
                bank_names.append(v)
        return bank_names
    
    def insert_value(self, bank_name : str, index : int, value : int | float):
        for v in self.y:
            if v.bank_name == bank_name:
                while len(v.y) < index:
                    v.y.append(None)
                v.y.insert(index, value)
                break
            
    class Config:
        from_attributes = True
