FROM node:18

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package*.json ./
RUN yarn

COPY . .

RUN yarn build

EXPOSE 3000

CMD "yarn" "start"