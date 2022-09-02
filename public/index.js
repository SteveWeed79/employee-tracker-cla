const inquirer = require('inquirer')

function employee() {

    inquirer
        .prompt([

            {
                type: 'list',
                name: 'tasks',
                message: 'What would you like to do?',
                choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add A Role', 'View Departments', 'Add Department']
            },
            {
                type: 'input',
                name: 'first_name',
                message: 'Please enter the employees first name.'
            },
            {
                type: 'input',
                name: 'last_name',
                message: 'Please enter the employees last name.'
            },
            {
                type: 'input',
                name: 'addRoleTitle',
                message: 'What is the name of the role.'
            },
            {
                type: 'input',
                name: 'addRoleSalary',
                message: 'What is the salary for this role?',
            },
            {
                type: 'list',
                name: 'addRoleDept',
                message: 'What department is this role in?',
                list: []
            },

        ])
};