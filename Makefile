.PHONY: all install start test db_config create_migrations migrate clean

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

clean:
  rm -rf migrations knexfile.js node_modules/
