FROM node:19-alpine3.15

COPY package*.json .

RUN npm install

COPY . .

CMD ["/bin/sh", "-c", "npm run migrate:up; npm run start"]
