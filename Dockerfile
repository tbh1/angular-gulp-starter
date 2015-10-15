FROM node:latest

ENV NODE_ENV production
ENV PORT 80

EXPOSE 80

RUN npm install -g bower gulp

COPY . /app
WORKDIR /app
RUN npm i && bower i --allow-root

CMD ["node", "index.js"]
