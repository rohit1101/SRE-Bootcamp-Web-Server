ARG NODE_VERSION=20.14.0

FROM node:${NODE_VERSION}-alpine AS build

# Set working directory as /app
WORKDIR /app

# copy deps
COPY ./package*.json ./

# install the dependencies 
RUN npm install

# copy all source code 
COPY . .

FROM build as run

WORKDIR /app
COPY --from=build /app ./

# set envs required for the web-server to run 
# use DB_HOST=db when using docker compose service
ARG NODE_ENV=development
ARG DB_USER=postgres
ARG DB_PASSWORD=postgres
ARG DB_HOST=db
ARG DB_PORT=5432
ARG DB_DATABASE=postgres

# expose port 3000 for the web server to be accessed
EXPOSE 3000

# execute this following command once the container boots
ENTRYPOINT ["sh", "-c", "npx knex migrate:latest && npm start"]
