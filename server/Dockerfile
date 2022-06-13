FROM node:14-alpine

WORKDIR /usr/src/app

COPY package*.json ./
COPY prisma ./prisma/
RUN npm install -g nodemon
RUN npm ci
COPY . .

EXPOSE 5000

CMD ["npm", "start"]