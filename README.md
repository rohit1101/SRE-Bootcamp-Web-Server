# [SRE Bootcamp](https://playbook.one2n.in/sre-bootcamp)

This repo contains the step by step implementation of **SRE Bootcamp** and updated **README** for the steps I followed to completed each milestone🏅.

## Technologies used:

- OS: Ubuntu 22.04 LTS
- Web server: Node.js, Expressjs
- Unit Tests: Jest,Supertest and Postman
- Database: PostgreSQL
- Database Migration: Knex
- Nodejs version: v20.14.0 LTS

## Milestones

1. [Create a simple REST API Webserver]
2. [Containerise REST API]
3. [Setup one-click local development setup]
4. [Setup a CI pipeline]
5. [Deploy REST API & its dependent services on bare metal]
6. [Setup Kubernetes cluster]
7. [Deploy REST API & its dependent services in K8s]
8. [Deploy REST API & its dependent services using Helm Charts]
9. [Setup one-click deployments using ArgoCD]
10. [Setup an observability stack]
11. [Configure dashboards & alerts]

[Pre-requisites]: #pre-requisites
[Create a simple REST API Webserver]: #create-a-simple-rest-api-webserver
[Containerise REST API]: #Containerise-REST-API
[Setup one-click local development setup]: #setup-one-click-local-development-setup
[Setup a CI pipeline]: #setup-a-CI-pipeline
[Deploy REST API & its dependent services on bare metal]: #deploy-rest-api--its-dependent-services-on-bare-metal
[Setup Kubernetes cluster]: #setup-kubernetes-cluster
[Deploy REST API & its dependent services in K8s]: #deploy-rest-api--its-dependent-services-in-K8s
[Deploy REST API & its dependent services using Helm Charts]: #deploy-rest-api--its-dependent-services-usin-helm-charts
[Setup one-click deployments using ArgoCD]: #setup-one-click-deployments-using-argoCD
[Setup an observability stack]: #setup-an-observability-stack
[Configure dashboards & alerts]: #configure-dashboards--alerts

### Pre-requisites:

- Once you have an Ubuntu system follow the below steps assuming you already have git CLI installed

```sh
sudo -i // switch to root user
apt update -y
```

- Clone the repo:

```sh
git clone https://github.com/rohit1101/SRE-Bootcamp-Web-Server.git
```

- Install the dependencies required for the project:

```sh
# installs nvm (Node Version Manager)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# download and install Node.js
nvm install 20

# verifies the right Node.js version is in the environment
node -v # should print `v20.14.0`

# verifies the right NPM version is in the environment
npm -v # should print `10.7.0`
```

- Install postgresql:

```sh
apt install postgresql // this install psql client for interacting with the database with quries
```

- Switch to postgres user and use psql client
  <img width="881" alt="image" src="https://github.com/rohit1101/SRE-Bootcamp-Web-Server/assets/37110560/d5e988b8-ad55-497c-8129-844b5f8eff33">

- Run the following command to set `postgres` user with a valid password and exit psql client using `\q` and type `exit` to logout from `postgres` user shell:

```psql
ALTER USER postgres PASSWORD 'postgres';
```

### Endpoints:

### 🏅Create a simple REST API Webserver

After successful pre-requisites setup following the below steps:

- Now let us clone this repo(fork and clone) and move into the src of the web server code:

```sh
git clone https://github.com/rohit1101/SRE-Bootcamp-Web-Server.git
cd SRE-Bootcamp-Web-Server
```

- Execute `make install` to install all the dependancies for the express js web server
- Run `make db_config` command creates a `knexfile.js` configuration file.
- Create a new directory named **migrations**

```sh
mkdir migrations
```

- Make sure you pass the correct values for the environment variables in a new file named `.env` by referring the `.env.example`. My `.env` file looks as shown below.\*Since I am testing the API locally I am using the default postgres DB for creating tables(on a production environment this is not recommended).

```env
NODE_ENV=development
DB_USER=postgres
DB_PASSWORD=postgres
DB_HOST=localhost
DB_PORT=5432
DB_DATABASE=postgres
```

- Modify the `knexfile.js` configuration file based on your requirements

```js
require("dotenv").config({ path: ".env" });
module.exports = {
  development: {
    client: "pg",
    connection: {
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: process.env.DB_DATABASE,
      password: process.env.DB_PASSWORD,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: "./migrations",
    },
  },
};
```

- Create a new migration, the following command will create a new migrations file in this path -> `migrations/` and update the migrations file by refering the migrations file in this repo.

```sh
make create_migrations
```

- This command applies the migration and creates the students table in your PostgreSQL database.

```sh
make migrate
```

  <img width="891" alt="image" src="https://github.com/rohit1101/SRE-Bootcamp-Web-Server/assets/37110560/304fa9f3-8a78-4b7c-b7cc-2722a3adefd0">
  
  
- Now switch to `postgres` user and enter `psql` to check our `students` table:
  <img width="848" alt="SCR-20240605-oevk" src="https://github.com/rohit1101/SRE-Bootcamp-Web-Server/assets/37110560/c3b822a0-dd43-413e-bc8e-02fe8bf72c6f">

### 🏅Containerise REST API

Follow the instructions to install docker on your Ubuntu Machine -> [Install docker on ubuntu](https://docs.docker.com/engine/install/ubuntu/#install-using-the-repository)

### 🏅Setup one-click local development setup

🚧 Work in progress

### 🏅Setup a CI pipeline

🚧 Work in progress

### 🏅Deploy REST API & its dependent services on bare metal

🚧 Work in progress

### 🏅Setup Kubernetes cluster

🚧 Work in progress

### 🏅Deploy REST API & its dependent services in K8s

🚧 Work in progress

### 🏅Deploy REST API & its dependent services using Helm Charts

🚧 Work in progress

### 🏅Setup one-click deployments using ArgoCD

🚧 Work in progress

### 🏅Setup an observability stack

🚧 Work in progress

### 🏅Configure dashboards & alerts

🚧 Work in progress

### The **Whys** of few steps or commands ?

- [Why `apt update -y` on Debian-based distros ?](https://askubuntu.com/a/222352)
