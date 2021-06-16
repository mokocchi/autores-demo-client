FROM node:16-alpine AS builder

WORKDIR /opt/web
COPY app/package.json ./
COPY app/yarn.lock ./

RUN yarn install

ENV PATH="./node_modules/.bin:$PATH"

COPY ./app ./

RUN cp src/env.js.dist src/env.js

RUN yarn build

FROM nginx:1.9.15-alpine
RUN apk --no-cache add curl
RUN curl -L https://github.com/a8m/envsubst/releases/download/v1.1.0/envsubst-`uname -s`-`uname -m` -o envsubst && \
    chmod +x envsubst && \
    mv envsubst /usr/local/bin
COPY ./nginx.config /etc/nginx/conf.d/default.conf

COPY --from=builder /opt/web/build /usr/share/nginx/html

WORKDIR /usr/share/nginx

COPY ./env.sh .
COPY .env-template .

RUN apk add --no-cache bash gettext

RUN chmod +x env.sh

WORKDIR /usr/share/nginx/html

CMD ["/bin/bash", "-c", "envsubst < /usr/share/nginx/.env-template > /usr/share/nginx/.env \
    && /usr/share/nginx/env.sh \
    && nginx -g 'daemon off;'"]