FROM node:20.11-alpine

WORKDIR /usr/src/app

COPY package.json ./

RUN npm i

COPY . .

RUN npm run build

EXPOSE 8081

CMD ["node", "dist/main"]
