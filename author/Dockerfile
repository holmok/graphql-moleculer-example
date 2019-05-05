FROM node:current

WORKDIR /app
ADD . .

ENV NODE_ENV=production

RUN npm install
RUN node ./salt.js

CMD ["node", "index.js"]
