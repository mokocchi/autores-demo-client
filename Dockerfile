FROM node:16-alpine AS builder

WORKDIR /opt/web
COPY app/package.json ./
COPY app/yarn.lock ./

RUN yarn install --no-dev

ENV PATH="./node_modules/.bin:$PATH"

COPY ./app ./

RUN cp src/env.js.dist src/env.js

RUN yarn build

FROM nginx:1.9.15-alpine

COPY --from=builder /opt/web/build /usr/share/nginx/html

WORKDIR /usr/share/nginx

COPY ./env.sh .
COPY .env-template .

RUN apk add --no-cache bash gettext

COPY ./nginx.config /etc/nginx/conf.d/default.conf

RUN chmod +x env.sh

WORKDIR /usr/share/nginx/html

CMD ["/bin/bash", "-c", "envsubst < /usr/share/nginx/.env-template > /usr/share/nginx/.env \
    && /usr/share/nginx/env.sh \
    && nginx -g 'daemon off;'"]