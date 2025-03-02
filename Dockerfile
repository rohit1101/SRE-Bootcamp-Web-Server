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

# expose port 3000 for the web server to be accessed
EXPOSE 3000

# execute this following command once the container boots
ENTRYPOINT ["sh", "-c", "npx knex migrate:latest && npm start"]
