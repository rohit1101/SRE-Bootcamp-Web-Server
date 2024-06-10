.PHONY: all install start test db_config create_migrations migrate only_migrate build_api_image start_app lint clean

all: install start test

install:
	npm install

start:
	npm start

test:
	npm test

lint:
	npm run lint

db_config:
	@echo "Generating knexfile.js file..."
	npx knex init

create_migrations: db_config
	@echo "Create migrations file at migrations/"
	npx knex migrate:make create_students_table

migrate: create_migrations
	@echo "Applying migrations and creating table in postgres DB"
	npx knex migrate:latest

only_migrate:
	@echo "Applying mirgations and creating students table on DB container"
	npx knex migrate:latest

build_api_image:
	docker build -t web-server-image .

start_app: build_api_image
	@echo "Starting DB container, check for healthy status, run DB migrations and start web-server container"
	docker-compose --profile DB up -d

delete_app:
	docker-compose --profile DB down

clean:
	rm -rf migrations knexfile.js node_modules/