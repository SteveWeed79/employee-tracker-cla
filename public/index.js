const inquirer = require('inquirer')

function employee() {

    inquirer
        .prompt([

            {
                type: 'list',
                name: 'role',
                message: 'What would you like to do?',
                choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add A Role', 'View Departments', 'Add Department']
            },

        ])

};