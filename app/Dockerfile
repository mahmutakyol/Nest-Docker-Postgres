FROM node:12.19.0

WORKDIR /usr/src/app

COPY package*.json yarn.lock ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 8081

CMD [ "npm", "run", "serve"]