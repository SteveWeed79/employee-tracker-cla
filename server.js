const mysql = require('mysql2');
const inquirer = require('inquirer');




const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'employee_db'
    },
    console.log(`Connected to the employee_db database.`)
);

const departmentChoices = async () => {
    const departmentQuery = `SELECT id AS value, name FROM department;`;
    return await db.promise().query(departmentQuery);

};


async function employee() {

    const departments = await departmentChoices();

    await inquirer
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
                when: (answers) => answers.tasks === 'Add Employee'
            },

            {
                type: 'input',
                name: 'last_name',
                message: 'Please enter the employees last name.',
                when: (answers) => answers.tasks === 'Add Employee'
            },
            {
                type: 'input',
                name: 'addRoleToEmp',
                message: 'What is the name of the role?',
                when: (answers) => answers.tasks === 'Add Employee'
            },
            {
                type: 'input',
                name: 'addRoleTitle',
                message: 'What is the name of the role?',
                when: (answers) => answers.tasks === 'Add Role'
            },
            {
                type: 'input',
                name: 'addRoleSalary',
                message: 'What is the salary for this role?',
                when: (answers) => answers.tasks === 'Add Role'
            },
            {
                type: 'list',
                name: 'addRoleDept',
                message: 'What department is this role in?',
                choices: departments[0],
                when: (answers) => answers.tasks === 'Add Role'
            },
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
                        })
                    restartApp()
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
                        })
                    restartApp()
                    break

                case 'View All Employees':
                    db.query('SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id;', function (err, result) {
                        console.table(result)
                    })
                    break

                case 'Add Employee':
                    let fName = data.first_name;
                    let lName = data.last_name;
                    let empRole = data.addRoleToEmp;
                    db.query("INSERT INTO employee SET ?", {
                        first_name: fName,
                        last_name: lName,
                        role_id: empRole
                    },
                        function (error) {
                            if (error) throw error;
                        })
                    restartApp()
                    break

            }
        })
};

function restartApp() {
    inquirer
        .prompt([
            {
                type: 'confirm',
                name: 'restart',
                message: 'Do you want to continue?'
            },
        ])
        .then((data) => {
            if (!data.restart) {
                process.exit()
            } else {
                employee()
            }
        })
};



// db.query('SELECT * FROM employee', function (err, results) {
//     console.log(results);
// });



employee()