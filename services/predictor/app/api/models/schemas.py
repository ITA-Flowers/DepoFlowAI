from pydantic import BaseModel

class BankBase(BaseModel):
    name : str
    domain : str
        
class BankCreate(BankBase):
    pass

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
        

class OfferBase(BaseModel):
    percentage: float
    time: int | None = None
    limit: int | None = None
    url: str | None = None
    name: str
    
    
class OfferCreate(OfferBase):
    bank_id: int
    client_id: int
    product_type_id: int
    offer_type_id: int
    
    
class Offer(OfferBase):
    id: int
    bank: Bank
    client: Client
    productType: ProductType
    offerType: OfferType
    
    class Config:
        from_attributes = True



class ErrorResponseDefault(BaseModel):
    detail : str