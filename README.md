# DEHIA Frontend
A frontend for [DEHIA](link-sedici), a platform for managing and executing data collection activities that require human intervention.

## Contents
- [DEHIA](#dehia)
- [Installation](#installation)
  - [Docker](#docker)
  - [Run locally (Linux)](#run-locally-linux)
- [Deploying to GitHub Pages (Linux)](#deploying-to-github-pages-linux)
- [Deploying to Heroku](#deploying-to-heroku)
  - [Prerequisites](#prerequisites)
  - [Deployment](#deployment)
- [Environment Variables](#environment-variables)
- [See Also](#see-also)

## DEHIA
DEHIA is a platform for Defining and Executing Human Intervention Activities. Its goal is to allow users without programming knowledge to create activities (sets of tasks, mainly for data collection) through a web authoring tool. The activities are exported to a configuration file and then "executed" (solved) from a mobile app. This kind of activities requires human intervention and cannot be solved automatically. 

There is also an API that manages the activities lifecycle, collects the data from the mobile app and returns the results. It also manages the security of the application. The API includes a Gateway and four services: Define, Auth, Collect and Results.

## Installation
You can install the frontend either in its containerized version using Docker or locally (on Linux) using Yarn.
### Docker
 1. Create an `app/src/env.js` file based in `app/src/env.dist` (See [Environment Variables](#Environment-Variables))
 2. If the gateway is also run with docker, take note of the docker network.
 3. Build the image: 
 ```
 docker image build -t <image-tag> .
 ```
 4. Run the container exposing one port
 ```
 docker run --name <container-name> -p <host-port>:80 <image-tag>
 ```
 5. Go to `http://localhost:<host-port>`. You should see the login page.
### Run locally (Linux)
1. Make sure you have `node` installed:
 ```
 node --ver
 ```
 2. Install `yarn` with `npm` or your package manager https://classic.yarnpkg.com/en/docs/install/#debian-stable
 3. Install dependencies
 ```
 yarn install
 ```
 4. Create an `app/src/env.js` file based in `app/src/env.js.dist` (See [Environment Variables](#Environment-Variables))
 5. Set the port: `export PORT=<port>`
 6. Run the frontend
 ```
 yarn start
 ```
 7. Go to `http://localhost:<host-port>`. You should see a loading message, or the login page if the gateway is running.
## Deploying to GitHub Pages (Linux)
## Deploying to Heroku
You can deploy the dockerized version to Heroku if you want, but I do not recommend this because you will use up one app for static content, and it sleeps after 30 min of inactivity (Free tier).
### Prerequisites
 - Having the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) installed
 - Having a heroku account and room for one more app
### Deployment
. Login in to the Heroku CLI
  ```
  heroku login
  ```
  2. Create a new app
  ```
  heroku create
  ```
  3. You can now change the app name if you want at the Heroku [Dashboard](https://dashboard.heroku.com/)
  4. Set the stack to `container`
  ```
  heroku stack:set container
  ```
  5. Push app to heroku
  ```
  git push heroku master
  ```
  6. Go to `https://<your-app>.herokuapp.com`. You should see a loading message, or the login page if the gateway is running.
## Environment Variables
  - **GATEWAY_HOST**: URL of the Gateway. If you're using Docker in the frontend and the gateway at the same time, create a network first (`docker network create <dehia-network>`) and then run the other containers. Run `docker network inspect <dehia-network>` to get the IP address of the other container and take note. Don't forget to add the port if it's different from Port `80`.
## See Also
- [DEHIA Gateway](https://github.com/mokocchi/dehia_gateway)
- [DEHIA Mobile App](https://github.com/mokocchi/prototipo-app-actividades)
- [DEHIA Define Service](https://github.com/mokocchi/dehia_define)
- [DEHIA Auth Service](https://github.com/mokocchi/dehia_auth)
- [DEHIA Collect Service](https://github.com/mokocchi/dehia_collect)
- [DEHIA Results Service](https://github.com/mokocchi/dehia_results)
