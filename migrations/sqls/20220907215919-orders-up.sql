CREATE TABLE orders (
    id serial PRIMARY KEY,
    status varchar(15) default 'open',
    user_id INT REFERENCES users(id)
);

