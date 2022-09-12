CREATE TABLE order_products (
    quantity INT not null default 1,
    order_id INT ,
    foreign key (order_id) references orders(id),
    product_id INT ,
    foreign key (product_id) references products(id),
    primary key (order_id, product_id)
);

