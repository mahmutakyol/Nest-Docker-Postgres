FROM node:12.19.0

WORKDIR /valde/src/api

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 8080

CMD [ "node", "dist/main" ]