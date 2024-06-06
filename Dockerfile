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
ENV NODE_ENV=development
ENV DB_USER=postgres
ENV DB_PASSWORD=postgres
ENV DB_HOST=localhost
ENV DB_PORT=5432
ENV DB_DATABASE=postgres

# expose port 3000 for the web server to be accessed
EXPOSE 3000

# execute this following command once the container boots
ENTRYPOINT ["npm","start"]
