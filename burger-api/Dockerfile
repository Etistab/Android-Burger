FROM node:13.12-alpine as builder

WORKDIR /app

COPY package*.json tsconfig.json .env ./

COPY /src ./src

RUN npm install && npm run build && mv node_modules .env build/

FROM node:13.12-alpine

WORKDIR /app

COPY --from=builder /app/build .

CMD ["node", "index.js"]
