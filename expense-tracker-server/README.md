## Expense Tracker Server

### Stack

* Node
* Hapi.js
* MongoDB

### Run locally

* Clone this repo
* Ensure `yarn` is installed
* Run `yarn install` to get deps
* Run `yarn start:dev`
* With cURL or Postman, query `localhost:2000`

### Run with docker

* Ensure docker is installed
* Run `docker build -t <image-name> .`
* Run `docker run -p 2000:2000 -d <image-name>`
* With cURL or Postman, query `localhost:2000`
