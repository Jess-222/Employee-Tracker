const mysql = require("mysql2");
const inquirer = require("inquirer");
//if errors check again

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Password1",
    database: "employees_db",
});

function start() {
    inquirer.prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [
            "View all departments",
            "View all roles",
            "View all employees",
            "Add a department",
            "Add a role",
            "Add an employee",
            "Update employee role",
            "Exit"
        ],
    })
        .then(function (answer) {
            switch (answer.action) {
                case "View all departments":
                    viewDepartments();
                    break
                case "View all roles":
                    viewRoles();
                    break
                case "View all employees":
                    viewEmployees();
                    break
                case "Add a department":
                    addDepartment();
                    break
                case "Add a role":
                    addRole();
                    break
                case "Add an employee":
                    addEmployee();
                    break
                case "Update employee role":
                    updateEmployeeRole();
                    break
                case "Exit":
                    connection.end();
                    break;
                default:
                    break;
            }
        });
};

const viewDepartments = () => {

    let query = "SELECT * FROM department";

    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        start();
    })
};

const viewRoles = () => {

    let query = "SELECT role.title, role.salary, role.id, department.name FROM role RIGHT JOIN department ON role.department_id = department.id";

    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        start();
    })
};

const viewEmployees = () => {

    let query = "SELECT t1.first_name, t1.last_name, t2.first_name AS manager FROM employee t1 INNER JOIN employee t2 ON t1.manager_id = t2.id";

    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        start();
    })
};

// ADD  DEPARTMENT
const addDepartment = () => {
    connection.query(query, function (err, res) {
        if (err) throw (err);
    });
    inquirer.prompt([
        {
            name: "departmentName",
            type: "input",
            message: "What is the name of the new department you would like to add?"
        }
    ]).then( function (answer) {
        connection.query("INSERT INTO departments SET ?",
        {
            name: answer.departmentName
        }),
        start();
    }); 
};

// ADD ROLE
const addRole = () => {
    connection.query(query, function (err, res) {
        if (err) throw (err);
    inquirer.prompt(
        [{
            name: "roleName",
            type: "input",
            message: "What is the name of the role you would like to add?",
        },
        {
            name: "addSalary",
            type: "input",
            message: "What is this role's salary?"
        },
        {
            name: "departmentId",
            type: "list",
            choices: function () {
                return res.map((role) => ({
                    name: department.name,
                    value: department.id
                }));
            },
            message: "What department does this new role belong to?",
        },
    ])
    .then( function (answer) {
        connection.query("INSERT INTO role SET ?",{
            role_name: answer.roleName,
            salary: answer.addSalary,
            department_id: answer.department.Id,
        }),
        start();
    });
});
};

const addEmployee = () => {
connection.query("SELECT * FROM role", function (err, res) {
    if (err) throw (err);
    inquirer.prompt(
    [{
        name: "firstName",
        type: "input",
        message: "first name?"
    },
    {
        name: "lastName",
        type: "input",
        message: "last name?"
    },
    {
        name: "managerId",
        type: "input",
        message: "manager Id?"
    },
    {
        name: "addRole",
        type: "list",
        choices: function () {
            return res.map((role) => ({ name: role.title, value: role.id }));
        },
        message: "role?",
    },
    ])
    .then( function (answer) {
        connection.query("INSERT INTO employee SET ?",{
            first_name: answer.firstName,
            last_name: answer.lastName,
            manager_id: answer.managerId,
            role_id: answer.addRole,
        }),
         start();
    });
}); 
};


const updateEmployeeRole = () => {
    connection.query("SELECT * FROM role", function (err, res) {
        inquirer.prompt([
            {
                name: "employeeId",
                type: "input",
                message: "employee Id?",
            },
            {
                name: "updatedRole",
                type: "list",
                choices: function () {
                    return res.map((role) => ({ name: role.title, value: role.id}));
                },
                message: "role?",
            },
        ])
        .then(function (answer) {
            console.log(answer.updatedRole);
            connection.query(
                "UPDATE employee SET > WHERE ?",
                [{role_id: answer.updatedRole}, 
                 {id: answer.employeeId},
                ]);
                start();
        });
    });    
};


start();