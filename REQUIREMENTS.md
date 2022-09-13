# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

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

## Data Shapes
#### Product
```
create TABLE products (
    id serial primary key,
    name varchar not null default 'product_name',
    price INT not null default 0,
    category varchar default 'default'
);
```
#### User
```
CREATE TABLE users (
    id serial PRIMARY KEY,
    first_name varchar,
    last_name varchar,
    username varchar,
    password varchar,
    admin boolean not null default false
);
```
#### Orders
```
CREATE TABLE orders (
    id serial PRIMARY KEY,
    status varchar(15) default 'open',
    user_id INT REFERENCES users(id)
);

CREATE TABLE order_products (
    quantity INT not null default 1,
    order_id INT ,
    foreign key (order_id) references orders(id),
    product_id INT ,
    foreign key (product_id) references products(id),
    primary key (order_id, product_id)
);
```
