CREATE TABLE users_information(
    id SERIAL PRIMARY KEY,
    username VARCHAR(100),
    code VARCHAR(100)
);

CREATE TABLE category_information(
    id SERIAL PRIMARY KEY,
    category VARCHAR(100)
);

CREATE TABLE expense_information(
    id SERIAL PRIMARY KEY,
    users_id INTEGER,
    categorys_id INTEGER,
    cost FLOAT NOT NULL,
    added_on date not null DEFAULT CURRENT_DATE,
    FOREIGN KEY (users_id) REFERENCES users_information(id),
    FOREIGN KEY (categorys_id) REFERENCES category_information(id)
);