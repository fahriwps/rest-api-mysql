CREATE DATABASE mbanking;
USE mbanking;

CREATE TABLE User (
    id INT PRIMARY KEY,
    name VARCHAR(255),
    address VARCHAR(255)
);

CREATE TABLE Transaction (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    type ENUM('income', 'expense'),
    amount DOUBLE,
    FOREIGN KEY (user_id) REFERENCES User(id)
);

INSERT INTO User (id, name, address)
VALUES
    (1, 'Yuki', 'Osaka'),
    (2, 'Sasaki', 'Tokyo');

INSERT INTO Transaction (id, user_id, type, amount)
VALUES
    (1, 1, 'income', 7000),
    (2, 1, 'expense', 3000),
    (3, 2, 'income', 5000),
    (4, 2, 'expense', 1000);
