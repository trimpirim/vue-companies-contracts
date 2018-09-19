FROM node

ARG APP_PORT

EXPOSE $APP_PORT

RUN apt-get update && apt-get install -y \
    apt-transport-https \
    openssl \
    git \
    unzip

#RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
#RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
#
#RUN apt-get update && apt-get install -y \
#    yarn
EXPOSE $APP_PORT
WORKDIR /var/www/app