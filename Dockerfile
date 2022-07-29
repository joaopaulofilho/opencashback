FROM node:14 AS builder
WORKDIR /app
COPY ./package*.json ./
RUN npm install --only=development
COPY . .
RUN npm run build


FROM node:14-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

COPY ./package*.json ./
RUN npm install --only=production

COPY . .
COPY --from=builder /app/dist ./dist

EXPOSE 3000
CMD ["node", "dist/main"]
