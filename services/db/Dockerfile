FROM mongo:latest

# [Optional]
# ENV MONGO_INITDB_ROOT_USERNAME=admin
# ENV MONGO_INITDB_ROOT_PASSWORD=password

# [Optional]
# COPY setup.sh /docker-entrypoint-initdb.d/

# Port
EXPOSE 27017

# Entrypoint
ENTRYPOINT ["docker-entrypoint.sh"]

# Run
CMD ["mongod"]
