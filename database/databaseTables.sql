CREATE TABLE users_information(
    userid SERIAL PRIMARY KEY,
    firstname VARCHAR(100),
    secondname VARCHAR(100),
    email VARCHAR(100)
);

CREATE TABLE catagory_information(
    catagory_id SERIAL PRIMARY KEY,
    category VARCHAR(100)
);

CREATE TABLE expense_infomation(
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    category_id INTEGER NOT NULL,
    cost FLOAT NOT NULL,
    date DATE,
    FOREIGN KEY (user_id) REFERENCES users_information(userid),
    FOREIGN KEY (category_id) REFERENCES catagory_information(catagory_id)
);

INSERT INTO catagory_information (category) VALUES('travel');
INSERT INTO catagory_information (category) VALUES('food');
INSERT INTO catagory_information (category) VALUES('toiletries');
INSERT INTO catagory_information (category) VALUES('communication');