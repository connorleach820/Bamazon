DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
	item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(30) NOT NULL,
    department_name VARCHAR(20) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INTEGER(11) NOT NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES  ('Golf Balls', 'Sports', 39.99, 210),
		('Basketball', 'Sports', 49.99, 438),
        ('Blue Cooler', 'Camping', 35.64, 115),
        ('58" LED TV', 'Electronics', 548.00, 12),
        ('13.3" Laptop', 'Electronics', 614.99, 10),
        ('64GB iPhone', 'Electronics', 699.00, 100),
        ('WWE Raw Main Event Ring', 'Toys', 88.99, 28),
        ('Water Pitcher', 'Home Improvement', 12.74, 239),
        ('Cordless Drill', 'Home Improvement', 29.97, 346),
        ('Reciprocating Saw', 'Home Improvement', 24.98, 278),
        ('Lawn Mower', 'Home Improvement', 169.00, 123);