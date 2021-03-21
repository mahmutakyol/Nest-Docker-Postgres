FROM node:12.19.0

WORKDIR /usr/src/api

COPY package*.json yarn.lock ./

RUN npm install && \
npm rebuild bcrypt --build-from-source

COPY . .

RUN npm run build

EXPOSE 8080

CMD [ "node", "dist/main" ]