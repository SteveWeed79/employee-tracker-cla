const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');

const PORT = process.env.PORT || 3001;
const app = express();

// const departmentChoices = async () => {
//     const departmentQuery = `SELECT id AS value, name FROM department;`;
//     const departments = await db.query(departmentQuery);
//     return departments[0];
// };


app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'employee_db'
    },
    console.log(`Connected to the employee_db database.`)
);




function employee() {

    inquirer
        .prompt([

            {
                type: 'list',
                name: 'tasks',
                message: 'What would you like to do?',
                choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View Departments', 'Add Department']
            },
            {
                type: 'input',
                name: 'first_name',
                message: 'Please enter the employees first name.',
                when: (answers) => answers.role === 'Add Employee'
            },
            {
                type: 'input',
                name: 'last_name',
                message: 'Please enter the employees last name.',
                when: (answers) => answers.role === 'Add Employee'
            },
            {
                type: 'input',
                name: 'addRoleToEmp',
                message: 'What is the name of the role?',
                when: (answers) => answers.role === 'Add Employee'
            },
            {
                type: 'input',
                name: 'addRoleTitle',
                message: 'What is the name of the role?',
                when: (answers) => answers.role === 'Add Role'
            },
            {
                type: 'input',
                name: 'addRoleSalary',
                message: 'What is the salary for this role?',
                when: (answers) => answers.role === 'Add Role'
            },
            // {
            //     type: 'list',
            //     name: 'addRoleDept',
            //     message: 'What department is this role in?',
            //     choices: departmentChoices(),
            //     when: (answers) => answers.role === 'Add Role'
            // },
            {
                type: 'input',
                name: 'addDept',
                message: 'What department number would you like to add?',
                when: (answers) => answers.tasks === 'Add Department'
            },

        ])

        .then((data) => {


            switch (data.tasks) {

                case 'Add Department':
                    let dept = data.addDept
                    db.query("INSERT INTO department SET ?", {
                        name: dept
                    },
                        function (error) {
                            if (error) throw error;
                            console.log("Department Added!")
                        })
                    break

                case 'Add Role':
                    let title = data.addRoleDept
                    let salary = data.addRoleSalary

                    db.query("INSERT INTO department SET ?", {
                        title: title,
                        salary: salary,
                    },
                        function (error) {
                            if (error) throw error;
                            console.log("Department Added!")
                        })
                    break
                case 'View All Employees':
                    result = db.query('SELECT * FROM employee;', function (err, result) {
                        console.log(result);
                    })

                    break
            }
        })


};



// db.query('SELECT * FROM employee', function (err, results) {
//     console.log(results);
// });

app.use((req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

employee()