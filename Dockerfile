FROM node:alpine

WORKDIR /code-editor/frontend

COPY package*.json ./

RUN npm ci

COPY public/ public/
COPY src/ src/
COPY server.js ./server.js

RUN npm run build

EXPOSE 3502

CMD ["node","server.js"]