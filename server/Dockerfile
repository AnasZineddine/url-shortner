FROM node:14-alpine

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/
RUN npm ci
COPY . .

EXPOSE 5000

CMD ["npm", "start"]