FROM node:alpine as dev

WORKDIR /secrets
COPY . .
RUN yarn install
RUN yarn build

FROM node:alpine as prod
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /secrets
COPY package.json .
COPY yarn.lock .
RUN yarn install --production
COPY --from=dev /secrets/dist ./dist
COPY ./certs /secrets/certs

CMD node /secrets/dist/main
