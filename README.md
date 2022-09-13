# API with PostgreSQL and Express

Udacity Nanodegree: Full Stack Javascript Developer
course: Creating an API with PostgreSQL and Express student:daddy2054

## Application Architecture

This is only backend, barebone part of a "storefront" application. Some endpoints for database operation are exposed. 

PostgreSQL is used as relational database. Express provides the routes. 

User's password are stored in the database in encrypted form. Authentication is enforced by Jason Web Token technology. 

## How to Deploy

```
$ git clone https://github.com/Daddy2054/postgresqlAPI
$ cd postgresqlAPI
```
Create file _.env_  in root directory of the project with:
```
POSTGRES_HOST=localhost # IP address of your host, where is running docker image
POSTGRES_DB=full_stack  # database name for developer mode
POSTGRES_TEST_DB=full_stack_test # database name for testing suits only
POSTGRES_USER=postgres  # username in postgres image which is used to connect to PostgreSQL instance
POSTGRES_PASSWORD=mysecretpassword # password for connecting to PostgreSQL instance
ENV=dev         # NOTE!! this variable is hardcoded only here: "test" is for tests only, "dev" is for dev mode
BCRYPT_PEPPER=your-secret-password # to hash passwords in the database bcrypt is using some string "pepper"
SALT_ROUNDS=10 # to hash passwords in the database bcrypt is using some integer number "salt"
TOKEN_SECRET=alohomora123 # to verify signature of token, Jason Web Token technology is using some string "your-256-bit-secret"
```
change everything what you need, according to your postgreSQL box, already running somewhere.

then: 
```
$ npm install
$ yarn add bcypt
$ db-migrate db:create full_stack
$ db-migrate up
$ npm run build
$ npm run start
```

## API Endpoints

REST API exposed endpoints:

| **Endpoint**      | **Description**                    | **Parameters**                                                  | **Permissions**       |
| ----------------- | ---------------------------------- | --------------------------------------------------------------- |-----|
|       **Dashboard**
|`GET /api/dashboard/products_in_orders` | Return a list of all products, included in orders | none | none |
|`GET /api/dashboard/five_most_expensive_products` | Return a list of five most expensive products| none | none |
|**Products**
|`GET /api/products` | Return a list of all products | none| none |
|`POST /api/products` | Create a new product | JSON object | token, admin |
|`GET /api/products/:id` | Return a product by ID | ?id=id as number | none |
|`DELETE /api/products/:id` | Delete a product by ID | ?id=id as number | token, admin |
|`GET /api/products/category/:id` | Return a list of products from category | ?category=category as string | none |
|**Users**
|`GET /api/users` | Return a list of all users | none |token, admin |
|`POST /api/users` | Register a new user | JSON Object |none |
|`POST /api/users/login` | Authenticate a user | JSON Object | none |
|`GET /api/users/:id` | Return a user record by ID | ?id=id as string token |
|`PUT /api/users/:id` | Make user an admin | ?id=id as number | token, admin |
|**Orders**
|`GET /api/orders` | Return a list of all orders | none | token, admin |
|`POST /api/orders` | Add product to order | JSON Objects | token |
|`PUT /api/orders` | Change product in order | JSON Object | token |
|`GET /api/orders/:id` | Return an order by ID | ?id=id as number| token  |
|`PUT /api/orders/:id` | Change status of an order | ?id=id as number JSON Object| token,admin  |
|`DELETE /api/orders/:id` | Delete an order by ID | ?id=id as number | token, admin  |
|`GET /api/orders/completed/:id` | Return a list of completed orders by user ID | ?id=id as number| token  |
|`GET /api/orders/current/:id` | Return current order by user ID | ?id=id as number| token  |

 ## Data structure:

check folder migrations/sqls for database schema

check folder handlers as a reference for JSON objects as parameters

check folder routes as a reference for endpoints
## How to use

make a call to an endpoint, providing parameters and receiving JSON object back
## How to test

NOTE: database name for testing "full_stack_test" is hardcoded in _package.json_ 
NOTE: variable ENV in _.env_  file should be "test" for testing
```
$ npm run test
```
## What is tested

1. all endpoints
2. token generating function
