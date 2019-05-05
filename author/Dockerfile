FROM node:current

WORKDIR /app

COPY package.json .
RUN npm install

COPY salt.js .
RUN mkdir /data
RUN node ./salt.js

ADD . .

CMD ["node", "index.js"]
