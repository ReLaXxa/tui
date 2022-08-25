# Overview

This is a NodeJS API, which outputs requested user's owned repos, latest branch for that repo and the SHA.
Using:

 - ExpressJS
 - TypeScript
 - GitHub API
 - Morgan
 - Jest
---
## Prerequisites
- [Node.js](https://nodejs.org) (`>= 12.0.0`) (developed with 16.16.0)
- [NPM](https://docs.npmjs.com/getting-started/installing-node)

## Install
1. Clone the repository
2. Install the dependencies with **npm**

> Make sure you already have [`node.js`](https://github.com/filoscoder/tenstack-starter#prerequisites) and [`npm`](https://github.com/filoscoder/tenstack-starter#prerequisites)  installed in your system.

 3. Copy .env.example and rename it to .env. Inside you will find this:
```env
PORT=8080
HOSTNAME=https://api.github.com
GIT_TOKEN=XXX
```
 - PORT - the port you want to run your app
 - HOSTNAME - the url for GitHub API [`GitHub REST Api`](https://docs.github.com/en/rest/quickstart)
 - GIT_TOKEN - generated personal GitHub access token [`How to generate token`](https://docs.github.com/en/enterprise-server@3.4/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)

## Run locally
1. Build the project  with ``` npm run build```
2. You can run it with `` npm run start `` or go into dev mode with ``npm run dev``

## Tests
Run ``npm run test`` to see the output in the console

## Deploy 
