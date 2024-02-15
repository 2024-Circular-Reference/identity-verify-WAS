FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

EXPOSE 8081

CMD ["node", "dist/main"]
