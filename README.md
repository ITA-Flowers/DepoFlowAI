# DepoFlowAI

![image](https://github.com/ITA-Flowers/DepoFlowAI/assets/74451381/6a4f266a-39d2-43fc-a32b-bdaf92429fa4)

## Deployment

### Guidance

Get into the services directory:

``` console
cd services/
```

Deploy using Docker-Compose:

``` console
docker compose up
```

Application will be available [here](http://localhost:9080/).

## System architecture

![architecture](https://github.com/ITA-Flowers/DepoFlowAI/assets/74451381/dd118e3e-97ba-4200-8804-a5eb76b0e5b4)

## Database model

![image](https://github.com/ITA-Flowers/DepoFlowAI/assets/74451381/6b637016-cae5-42e0-bb99-86aae510ba60)

## Repo structure

### Services

Docker containers integrated with docker compose.

#### Client

Frontend app developed with React JS

#### DB

Relational SQL MariaDB docker container

#### Scrapper

Python BeautifullSoup scrapper background unit

#### Predictor

Python Tensorflow AI model analyzer-predictor
