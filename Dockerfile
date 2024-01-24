FROM mongo:latest

WORKDIR /home/

COPY ./schemas /home/schemas/
COPY ./init-mongo.js /docker-entrypoint-initdb.d/

EXPOSE 27017
