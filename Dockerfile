FROM node:18-alpine AS migration
ARG DATABASE_URL
ENV DATABASE_URL $DATABASE_URL
ENV NODE_ENV production
WORKDIR /var/app
RUN mkdir src
COPY prisma prisma/
CMD npx prisma migrate deploy

FROM node:18-alpine AS dependencies
WORKDIR /var/app
COPY package.json yarn.lock tsconfig.json ./
RUN yarn install --frozen-lockfile

FROM node:18-alpine AS build
ENV NODE_ENV production
WORKDIR /var/app
COPY --from=dependencies /var/app/node_modules node_modules/
COPY . .
RUN yarn build

FROM node:18-alpine AS runtime
ARG DATABASE_URL
ENV DATABASE_URL $DATABASE_URL
ARG DATABASE_URL
ENV DATABASE_URL $DATABASE_URL
ENV NODE_ENV production
WORKDIR /var/app
USER node
COPY --from=dependencies /var/app/node_modules node_modules/
COPY --from=build /var/app/dist dist/
CMD ["node", "dist/index.js"]