FROM node:14.1-alpine AS builder

WORKDIR /opt/web
COPY package*.json ./
RUN yarn install

ENV PATH="./node_modules/.bin:$PATH"

COPY . ./
RUN yarn build

FROM nginx:1.17-alpine
RUN apk --no-cache add curl
RUN curl -L https://github.com/a8m/envsubst/releases/download/v1.1.0/envsubst-`uname -s`-`uname -m` -o envsubst && \
    chmod +x envsubst && \
    mv envsubst /usr/local/bin
COPY ./nginx.config /etc/nginx/nginx.template

COPY --from=builder /opt/web/build /usr/share/nginx/html

WORKDIR /usr/share/nginx/html

COPY ./env.sh .
COPY .env .

# Add bash
RUN apk add --no-cache bash

# Make our shell script executable
RUN chmod +x env.sh

CMD ["/bin/bash", "-c", "envsubst < /etc/nginx/nginx.template > /etc/nginx/conf.d/default.conf && /usr/share/nginx/html/env.sh && nginx -g 'daemon off;'"]