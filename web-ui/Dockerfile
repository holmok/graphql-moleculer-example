FROM node:current

WORKDIR /app

COPY package.json .
RUN npm install

ADD . .

RUN npm run build

CMD ["npm", "start"]
