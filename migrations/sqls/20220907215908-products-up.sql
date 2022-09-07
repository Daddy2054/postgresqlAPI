create TABLE products (
    id serial primary key,
    name varchar not null,
    price INT not null default 0
);