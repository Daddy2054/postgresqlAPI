create TABLE products (
    id serial primary key,
    name varchar not null default 'product_name',
    price INT not null default 0,
    category varchar default 'default'
);