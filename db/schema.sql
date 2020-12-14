-- Drops the company_db if it exists currently --
DROP DATABASE IF EXISTS company_db;
-- Creates the "company_db" database --
CREATE DATABASE company_db;
-- Makes it so all of the following code will affect company_db --
USE company_db;

-- Creates the table "department" within company_db --
CREATE TABLE department (
    -- A primary key that auto-increments--
    id INT AUTO_INCREMENT NOT NULL,
    -- Creates a numeric column called "id" --
    PRIMARY KEY (id) NOT NULL,
    -- Makes a string column called "name" --
    name VARCHAR(30) 
);

-- Creates the table "position" within company_db --
CREATE TABLE position (
    -- A primary key that auto-increments--
    id INT NOT NULL AUTO_INCREMENT,
    -- Sets id as this table's primary key which means all data contained within it will be unique --
    PRIMARY KEY (id) NOT NULL,
    -- Makes a string column called "title" --
    title VARCHAR(30),
    -- Makes values in binary format --
    salary DECIMAL NOT NULL,
    -- Creates a numeric column called "department_id" --
    department_id INT NOT NULL
);

-- Creates the table "employee" within company_db --
CREATE TABLE employee (
    -- A primary key that auto-increments--
    id INT NOT NULL AUTO_INCREMENT,
    -- Sets id as this table's primary key which means all data contained within it will be unique --
    PRIMARY KEY (id) NOT NULL,
    -- Makes a string column called "first_name" --
    first_name VARCHAR(30),
    -- Makes a string column called "last_name" --
    last_name VARCHAR(30),
    -- Creates a numeric column called "role_id" --
    role_id INT NOT NULL, 
    -- Creates a numeric column called "manager_id" --
    manager_id INT NOT NULL
);
