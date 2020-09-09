DROP DATABASE IF EXISTS employee_DB;

CREATE DATABASE employee_DB;

USE employee_DB;

CREATE TABLE department (
id INT NOT NULL,
name VARCHAR (30) NOT NULL,
PRIMARY KEY (id)
);

CREATE TABLE roles (
id INT NOT NULL,
title VARCHAR(30) NOT NULL,
salary DECIMAL (10,2) NOT NULL,
department_id INT NOT NULL,
FOREIGN KEY (department_id) REFERENCES department (id),
PRIMARY KEY (id)
);

CREATE TABLE employee (
id INT NOT NULL,
first_name VARCHAR (30) NOT NULL,
last_name VARCHAR (30) NOT NULL,
role_id INT NOT NULL,
FOREIGN KEY (role_id) REFERENCES roles (id),
manager_id INT NOT NULL,
PRIMARY KEY (id)
);