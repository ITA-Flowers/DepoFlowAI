from sqlalchemy import Column, Integer, String, Float, ForeignKey, Date, func
from sqlalchemy.orm import relationship

from database import Base


class Bank(Base):
    __tablename__ = 'Banks'
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(128), nullable=False, unique=True)
    domain = Column(String(128), nullable=False)
    

class Client(Base):
    __tablename__ = 'Clients'
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(128), nullable=False, unique=True)


class ProductType(Base):
    __tablename__ = 'ProductTypes'
    id = Column(Integer, primary_key=True)
    name = Column(String(128), nullable=False, unique=True)


class OfferType(Base):
    __tablename__ = 'OfferTypes'
    id = Column(Integer, primary_key=True)
    name = Column(String(128), nullable=False, unique=True)


class Offer(Base):
    __tablename__ = 'Offers'
    id = Column(Integer, primary_key=True, autoincrement=True)
    bankId_FK = Column(Integer, ForeignKey('Banks.id'), nullable=False)
    clientId_FK = Column(Integer, ForeignKey('Clients.id'), nullable=False)
    productTypeId_FK = Column(Integer, ForeignKey('ProductTypes.id'), nullable=False)
    offerTypeId_FK = Column(Integer, ForeignKey('OfferTypes.id'), nullable=False)
    date = Column(Date, nullable=False, default=func.current_date())
    percentage = Column(Float, nullable=False)
    time = Column(Integer, nullable=True)
    limit = Column(Integer, nullable=True)
    name = Column(String(256), nullable=False)

    bank = relationship("Bank")
    client = relationship("Client")
    productType = relationship("ProductType")
    offerType = relationship("OfferType")


class OffersDataModel(Base):
    __tablename__ = 'OffersDataModels'
    id = Column(Integer, primary_key=True, autoincrement=True)
    offerId_FK = Column(Integer, ForeignKey('Offers.id'), nullable=False)
    score = Column(Float, nullable=False)
    newOffersCount = Column(Integer, nullable=False)

    offer = relationship("Offer")


class ChartType(Base):
    __tablename__ = 'ChartTypes'
    id = Column(Integer, primary_key=True)
    name = Column(String(128), nullable=False, unique=True)