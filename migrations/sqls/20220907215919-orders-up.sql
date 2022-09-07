CREATE TABLE orders (
    id serial PRIMARY KEY,
    status varchar(15),
    user_id bigint REFERENCES users (id)
);

