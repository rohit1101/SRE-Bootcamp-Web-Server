.PHONY: all install start test db_config create_migrations migrate containerise clean

all: install start test

install:
	npm install

start:
	npm start

test:
	npm test

db_config:
	@echo "Generating knexfile.js file..."
	npx knex init

create_migrations: db_config
	@echo "Create migrations file at migrations/"
	npx knex migrate:make create_students_table

migrate: create_migrations
	@echo "Applying migrations and creating table in postgres DB"
	npx knex migrate:latest

containerise:
	docker run -d --name web-server -p 3000:3000 -e DB_USER=postgres -e DB_PASSWORD=postgres -e DB_HOST=127.0.0.1 -e DB_PORT=5432 -e DB_DATABASE=postgres awsclouddev/sre-bootcamp-web-server:v3.0

clean:
	rm -rf migrations knexfile.js node_modules/
