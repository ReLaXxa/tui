FROM node:latest
WORKDIR /srv/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 8080

CMD ["node", "dist/src/app.js"]