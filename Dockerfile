FROM node:alpine as dev

ARG APP_NAME=secrets

WORKDIR /${APP_NAME}
COPY . .
RUN yarn install
RUN yarn build

FROM node:alpine as prod
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /${APP_NAME}
COPY package.json .
COPY yarn.lock .
RUN yarn install --production
COPY --from=dev /${APP_NAME}/dist ./dist

CMD node /${APP_NAME}/dist/main
