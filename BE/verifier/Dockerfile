FROM node:16-alpine

WORKDIR /usr/src/app

COPY package.json ./

RUN npm i

COPY . .

RUN npm run build

EXPOSE 8083

CMD ["node", "dist/main"]
