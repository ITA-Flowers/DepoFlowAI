from pydantic import BaseModel

class BankBase(BaseModel):
    name : str
    domain : str

class Bank(BankBase):
    id : int
    
    class Config:
        from_attributes = True


class ClientBase(BaseModel):
    name : str
    
class Client(ClientBase):
    id : int
    
    class Config:
        from_attributes = True
        

class OfferTypeBase(BaseModel):
    name : str
    
class OfferType(OfferTypeBase):
    id : int
    
    class Config:
        from_attributes = True
        
    
class ProductTypeBase(BaseModel):
    name : str
    
class ProductType(ProductTypeBase):
    id : int
    
    class Config:
        from_attributes = True
        
        

class ErrorResponseDefault(BaseModel):
    detail : str