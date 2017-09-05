FROM kkarczmarczyk/node-yarn:7.4-slim

ENV NPM_CONFIG_LOGLEVEL warn

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . /usr/src/app/
RUN yarn install

RUN yarn build
RUN yarn global add serve

EXPOSE 5000
CMD ["serve", "-s", "build"]
