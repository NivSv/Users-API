#Typescript Build Stage
FROM node:16.14.2-alpine3.15

WORKDIR /usr/app

RUN npm install -g pnpm@7.9.0

COPY package.json ./
COPY pnpm-lock.yaml ./
COPY pnpm-workspace.yaml ./
COPY .npmrc ./

COPY ./packages packages

COPY ./apps/user-service/src                   apps/user-service/src
COPY ./apps/user-service/package.json          apps/user-service
COPY ./apps/user-service/env.d.ts              apps/user-service
COPY ./apps/user-service/.env.example          apps/user-service
COPY ./apps/user-service/nest-cli.json         apps/user-service
COPY ./apps/user-service/tsconfig.json         apps/user-service
COPY ./apps/user-service/tsconfig.build.json   apps/user-service

RUN pnpm install --ignore-scripts --frozen-lockfile
RUN pnpm run --filter "./packages/**" build

WORKDIR /usr/app/apps/user-service
RUN pnpm run build

CMD ["pnpm", "start"]