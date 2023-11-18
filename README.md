# DepoFlowAI

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

Application will be available [here](http://localhost:9097/).

## Repo structure

### Services

Docker containers integrated with docker compose.

#### Client

Frontend app developed with React JS

#### DB

NoSQL MongoDB docker container

#### Scrapper

Python BeautifullSoup scrapper background unit

#### Predictor

Python Tensorflow AI model analyzer-predictor
