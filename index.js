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
    inquirer.createPromptModule({
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
    }).then(function (answer) {
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
                    break
    
        }
    })
}

start()