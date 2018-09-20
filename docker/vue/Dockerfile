FROM node

ARG APP_PORT

EXPOSE $APP_PORT

RUN apt-get update && apt-get install -y \
    apt-transport-https \
    openssl \
    git \
    unzip

RUN npm install -g vue-cli

EXPOSE $APP_PORT
WORKDIR /var/www/app