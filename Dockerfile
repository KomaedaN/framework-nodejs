FROM node:26.7.0-alpine3.24

RUN mkdir -p /home/node/node_modules && chown node:node /home/node/node_modules

USER node
WORKDIR /home/node
