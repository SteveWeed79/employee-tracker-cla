INSERT INTO department (name)
VALUES ("Sales"),
       ("Engineering"),
       ("Management"),
       ("Accounting");

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 100000, 1),
       ("Salesperson", 40000, 1),
       ("Lead Engineer", 200000, 2),
       ("Software Engineer", 100000, 2),
       ("Engineering Manager", 250000, 3),
       ("Accountant", 75000, 4 ),
       ("Lead Accountant", 150000, 4);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Bob", "Smith", 1, 4),
       ("Sally", "Sue", 4, NULL),
       ("Larry", "Jones", 2, 4),
       ("Melissa", "Doura", 3, NULL),
       ("LaDee", "Bicknese", 1, NULL),
       ("Stanley", "Caterson", 4, NULL),
       ("Jason", "Worth", 1, NULL);