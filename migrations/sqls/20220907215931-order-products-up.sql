CREATE TABLE order_products (
    quantity INT not null default 1,
    order_id bigint ,
    foreign key (order_id) references orders(id),
    product_id bigint ,
    foreign key (product_id) references products(id),
    primary key (order_id, product_id)
);

