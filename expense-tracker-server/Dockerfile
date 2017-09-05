FROM kkarczmarczyk/node-yarn:7.4-slim

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . /usr/src/app/
RUN yarn install
RUN yarn build

EXPOSE 2000
CMD ["yarn", "start"]
