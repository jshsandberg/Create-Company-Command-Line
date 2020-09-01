var mysql = require("mysql");
var inquirer = require("inquirer");
const { allowedNodeEnvironmentFlags } = require("process");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "employee_DB"
});

connection.connect(function(err) {
    if (err) throw err;
    runApplication();
});

function runApplication() {
    inquirer.prompt({
            name: "action",
            type: "list",
            message: "What action would you like to perform?",
            choices: [
                "Add departments, roles, employees",
                "View departments, roles, employees",
                "Update employee roles",
            ]
    })
    .then(response => {
        switch(response.action) {
            case "Add departments, roles, employees":
                inquirer.prompt({
                        name:"add",
                        type: "list",
                        message: "Which area would you like to add to?",
                        choices: [
                            "Departments?",
                            "Roles?",
                            "Employees?"
                        ]
            })
            .then(response => {
                switch(response.add) {
                    case "Departments?":
                        inquirer.prompt([
                            {
                                name: "departmentID",
                                type: "input",
                                messaage: "What would you like the ID to be for the department?"
                            },
                            {
                                name: "departmentName",
                                type: "input",
                                message: "What would you like the name to be?"
                            }
                        ])
                        .then(response => {
                            connection.query(
                                "INSERT INTO department SET ?",
                                {
                                    id: response.departmentID,
                                    name: response.departmentName
                                },
                            function(err) {
                                if (err) throw err;
                                console.log(`sucess`);
                            }
                            );
                        });
                    break;

                    case "Roles?":
                        inquirer.prompt([
                            {
                                name: "rolesID",
                                type: "input",
                                message: "What would you like the ID to be for the role?"
                            },
                            {
                                name: "roleTitle",
                                type: "input",
                                message: "What is the title of this role?"
                            },
                            {
                                name: "roleSalary",
                                type: "input",
                                message: "What is the salary for this role?"
                            },
                            {
                                name: "roleDepartmentID",
                                type: "input",
                                message: "What is the department ID for this role?"
                            }
                        ])
                        .then(response => {
                            connection.query(
                                "INSERT INTO roles SET ? ",
                                {
                                    id: response.rolesID,
                                    title: response.roleTitle,
                                    salary: response.roleSalary,
                                    department_id: response.roleDepartmentID
                                },
                                function(err) {
                                    if (err) throw err
                                    console.log(`hehe`);
                                }
                            );
                        });
                    break;

                    case "Employees?":
                        inquirer.promot([
                            {
                                name: "employeeID",
                                type: "input",
                                message: "What would you like the employee ID to be?"
                            },
                            {
                                name: "employeeFirstName",
                                type: "input",
                                message: "What is the employee's first name?"
                            },
                            {
                                name: "employeeLastName",
                                type: "input",
                                message: "What is the employee's last name?"
                            },
                            {
                                name: "employeeRoleID",
                                type: "input",
                                message: "What is the employess role ID?"
                            },
                            {
                                name: "employeeManagerID",
                                type: "input",
                                message: "What is the Supervisor's ID for this employee?"
                            }
                        ])
                        .then(response => {
                            connection.query(
                                "INSERT INTO employee SET ?",
                                {
                                    id: response.employeeID,
                                    first_name: response.employeeFirstName,
                                    last_name: response.employeeLastName,
                                    role_id: response.employeeRoleID,
                                    manager_id: response.employeeManagerID
                                },
                                function(err) {
                                    if (err) throw error;
                                    console.log(`did it`);
                                }
                            );
                        });
                    break;
                }
            })
            break;
            
            case "View departments, roles, employees",
                inquirer.prompt(
                    {
                        name: "view",
                        type: "list",
                        name: "What would you like to view?",
                        choices: [
                            "Departments",
                            "Roles",
                            "Employees",
                        ]
                    }
                )
                .then(response => {
                    switch(response.view) {
                        case "Departments",
                            connection.query(
                                `SELECT * FROM department`, function(err, result, field) {
                                    if (err) throw error;
                                    console.log(result)
                                }    
                            ):
                        break; 

                        case "Roles",
                            connection.query(
                                `SELECT * FROM roles`, function(err, result) {
                                    if (err) throw error;
                                    console.log(result)
                                }
                            ):
                        break;

                        case "Employees",
                            connection.query(
                                `SELECT * FROM employee`, function(err, result) {
                                    if (err) throw error;
                                    console.log(result)
                                }
                            ):
                        break;
                    }
                }):
            break;

        }
    })
}

