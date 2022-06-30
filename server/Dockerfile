FROM node:16-alpine

WORKDIR /usr/src/app

COPY package*.json ./
COPY prisma ./prisma/
#RUN npm install -g nodemon
RUN npm ci
COPY . .

EXPOSE 5000

CMD ["npm", "start"]