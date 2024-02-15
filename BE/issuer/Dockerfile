FROM node:16-alpine

WORKDIR /usr/src/app

COPY package.json ./

RUN npm i

COPY . .

RUN npm run build

EXPOSE 8082

CMD ["node", "dist/main"]
