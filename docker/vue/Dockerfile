FROM node

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
EXPOSE 9000
WORKDIR /var/www/app