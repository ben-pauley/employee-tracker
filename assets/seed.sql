USE employee_db;

INSERT INTO department (name) 
VALUES 
("Engineering"),
("Finance"),
("Human Resources"),
("Sales");

INSERT INTO role (title, salary, department_id) 
VALUES 
('Software Engineer', 70000, 1);
('Junior Software Engineer', 30000, 1);
('Financial Manager', 50000, 2);
('Accountant', 35000, 2);
('HR Manager', 60000, 3);
('HR Admin', 30000, 3);
('Head of Sales', 80000, 4);
('Sales Representative', 50000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES
("William", "Norton", 4, null),
("Danielle", "Dodd", 2, 1),
("Victoria", "Tyler", 3, 1),
("Alex", "Barton", 2, 3),
("Daniel", "Akhtar", 1, 1),
("Corey", "Clarke", 4, 1);