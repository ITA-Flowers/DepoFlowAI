USE depoflowdb;


CREATE USER 'flower'@'%';
SET PASSWORD FOR 'flower'@'%' = PASSWORD('FinTech4ever!');	
grant all privileges on *.* to 'flower'@'%';


CREATE TABLE `Banks`(
  id INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(128) NOT NULL UNIQUE,
  domain VARCHAR(128) NOT NULL,
  PRIMARY KEY(id)
);

CREATE TABLE `Clients`
  (id INT NOT NULL AUTO_INCREMENT, `name` VARCHAR(128) NOT NULL UNIQUE, PRIMARY KEY(id))
  ;

CREATE TABLE `ProductTypes`
  (id INT NOT NULL, `name` VARCHAR(128) NOT NULL UNIQUE, PRIMARY KEY(id));

CREATE TABLE `OfferTypes`
  (id INT NOT NULL, `name` VARCHAR(128) NOT NULL UNIQUE, PRIMARY KEY(id));

CREATE TABLE `Offers`(
  id INT NOT NULL AUTO_INCREMENT,
  `bankId_FK` INT NOT NULL,
  `clientId_FK` INT NOT NULL,
  `productTypeId_FK` INT NOT NULL,
  `OfferTypeId_FK` INT NOT NULL,
  percentage FLOAT NOT NULL,
  `time` INT,
  `limit` INT,
  `date` DATE NOT NULL DEFAULT (CURRENT_DATE),
  `name` VARCHAR(256) NOT NULL,
  PRIMARY KEY(id)
);

CREATE TABLE `OffersDataModels`(
  id INT NOT NULL AUTO_INCREMENT,
  `offerId_FK` INT NOT NULL,
  score FLOAT NOT NULL,
  `newOffersCount` INT NOT NULL,
  PRIMARY KEY(id)
);

CREATE TABLE `ChartTypes`
  (id INT NOT NULL AUTO_INCREMENT, `name` VARCHAR(128) NOT NULL UNIQUE, PRIMARY KEY(id))
  ;


ALTER TABLE `Offers`
  ADD CONSTRAINT `id_bankId_FK`
    FOREIGN KEY (`bankId_FK`) REFERENCES `Banks` (id) ON DELETE Cascade
      ON UPDATE Cascade;

ALTER TABLE `Offers`
  ADD CONSTRAINT `id_clientId_FK`
    FOREIGN KEY (`clientId_FK`) REFERENCES `Clients` (id) ON DELETE Cascade
      ON UPDATE Cascade;

ALTER TABLE `Offers`
  ADD CONSTRAINT `id_productTypeId_FK`
    FOREIGN KEY (`productTypeId_FK`) REFERENCES `ProductTypes` (id)
      ON DELETE Cascade ON UPDATE Cascade;

ALTER TABLE `Offers`
  ADD CONSTRAINT `id_OfferTypeId_FK`
    FOREIGN KEY (`OfferTypeId_FK`) REFERENCES `OfferTypes` (id) ON DELETE Cascade
      ON UPDATE Cascade;

ALTER TABLE `OffersDataModels`
  ADD CONSTRAINT `id_offerId_FK`
    FOREIGN KEY (`offerId_FK`) REFERENCES `Offers` (id) ON DELETE Cascade
      ON UPDATE Cascade;


INSERT INTO Clients(id,name)
    VALUES (1,"individual");
INSERT INTO Clients(id,name)
    VALUES (2,"corporation");
INSERT INTO Clients(id,name)
    VALUES (3,"localGovernment");

INSERT INTO ProductTypes(id,name)
    VALUES (1,"savingsDeposit");
INSERT INTO ProductTypes(id,name)
    VALUES (2,"savingsAccount");

INSERT INTO OfferTypes(id,name)
    VALUES (1,"forAll");
INSERT INTO OfferTypes(id,name)
    VALUES (2,"forNewcommers");
INSERT INTO OfferTypes(id,name)
    VALUES (3,"forNewFunds");


INSERT INTO ChartTypes(id,name)
  VALUES (1,"percentage");

INSERT INTO ChartTypes(id,name)
  VALUES (2,"newOffersCount");


INSERT INTO Banks(name,domain)
  VALUES ("Bank Handlowy w Warszawie SA","citibank.pl");
  
INSERT INTO Banks(name,domain)
  VALUES ("Bank Millennium","bankmillennium.pl");
  
INSERT INTO Banks(name,domain)
  VALUES ("Bank Nowy","banknowy.pl");

INSERT INTO Banks(name,domain)
  VALUES ("Bank Ochrony środowiska","bosbank.pl");
  
INSERT INTO Banks(name,domain)
  VALUES ("PEKAO SA","pekao.com.pl");

INSERT INTO Banks(name,domain)
  VALUES ("Bank Pocztowy SA","pocztowy.pl");
  
INSERT INTO Banks(name,domain)
  VALUES ("BNP Paribas Bank Polska SA","bnpparibas.pl");

INSERT INTO Banks(name,domain)
  VALUES ("Credit Agricole Bank Polska SA","credit-agricole.pl");
  
INSERT INTO Banks(name,domain)
  VALUES ("Deutsche Bank Polska","country.db.com");
  
INSERT INTO Banks(name,domain)
  VALUES ("ING Bank Sląski","ing.pl");

INSERT INTO Banks(name,domain)
  VALUES ("mBank","mbank.pl");
  
INSERT INTO Banks(name,domain)
  VALUES ("Nest Bank","nestbank.pl");
  
  
INSERT INTO Banks(name,domain)
  VALUES ("Plus Bank","plusbank.pl");
  
  
INSERT INTO Banks(name,domain)
  VALUES ("Powszechna Kasa Oszczędności Bank Polski SA",".pkobp.pl");

INSERT INTO Banks(name,domain)
  VALUES ("Santander Bank Polska","santander.pl");
  
INSERT INTO Banks(name,domain)
  VALUES ("Toyota Bank Polska","toyotabank.pl");
  
  
INSERT INTO Banks(name,domain)
  VALUES ("VeloBank SA","velobank.pl");