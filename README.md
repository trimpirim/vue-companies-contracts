# What is this?

A combination of docker-compose, docker-sync to allow you to run node application inside of docker.

# How should I use it?

Simply:
1. Clone this repo `git@github.com:trimpirim/vue-docker.git`;
2. `cp .env.dist .env`;
3. Modify `.env` file;
4. `./start-dev.sh`;

You should be able to `docker-compose exec vue bash` after that.


