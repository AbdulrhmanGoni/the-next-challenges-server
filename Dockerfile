FROM node:20.11.1

WORKDIR /the-next-challenges-server

COPY ./package.json .

RUN yarn

EXPOSE 8000

COPY . .

CMD [ "yarn", "start" ]