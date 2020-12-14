//Dependencies.
const inquirer = require("inquirer");
const mysql = require("mysql");
const cTable = require("console.table");

//--------------------------NOT SURE YET -------------------------001
//Using environment variables to connect to database
// const Sequelize = require('sequelize');

// // Enable access to .env variables
// require('dotenv').config();

// // Use environment variables to connect to database
// const sequelize = new Sequelize(
//     process.env.DB_NAME,
//     process.env.DB_USER,
//     process.env.DB_PASSWORD, {
//         host: 'localhost',
//         dialect: 'mysql',
//         port: 3306
//     }
// );
// module.exports = sequelize;
//--------------------------------------------------------------001

//Connection information for the SQL database.
var connection = mysql.createConnection({
    host: "localhost",
    //My port.
    port: 3306,
    //My Username.
    user: "Use your own",
    //My password.
    password: "Use your own",
    database: "company_db"
});

//Connect to the MYSQL server and SQL database.
connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    //Run the promptOne function after the connection is made to prompt the user.
    promptOne();
});

// 01 - This block will prompt the user on which action to take.
function promptOne() {
    //First action question.
    inquirer
        .prompt([{
            type: "list",
            message: "What would you like to do?",
            name: "firstAction",
            choices: [
                "View All Employees",
                "View All Employees by Department",
                "View All Employees by Manager",
                "Add Employee",
                "Add Department",
                "Add Position",
                "Remove Employee",
                "Update Employee Role",
                "Update Employee Manager",
                "QUIT"
            ],
        }])
        //Switch Statements to select from one of the options from above
        .then(function({ firstAction }) {
            switch (firstAction) {
                case "View All Employees":
                    vieAllEmp();
                    break;

                case "View All Employees by Department":
                    vieAllEmpByDep();
                    break;

                case "View All Employees by Manager":
                    vieAllEmpByMan();
                    break;

                case "Add Employee":
                    addEmp();
                    break;

                case "Add Department":
                    addDep();
                    break;

                case "Add Position":
                    addPos();
                    break;

                case "Remove Employee":
                    remEmp();
                    break;

                case "Update Employee Role":
                    updEmpRol();
                    break;

                case "Update Employee Manager":
                    updEmpMan();
                    break;

                case "QUIT":
                    console.log("Bye Felicia!")
                    connection.end();
                    break;
            };
        });
};

// 02 - This block will display all employees.
function vieAllEmp() {

    connection.query("SELECT * FROM employee", function(err, data) {
        console.table(data);
        promptOne();
    });
};

// 03 - This block will display all departments. C/P from 02 & update.
function vieAllEmpByDep() {

    connection.query("SELECT * FROM department", function(err, data) {
        console.table(data);
        promptOne();
    });
};

// 04 - This block will display all departments. C/P from 02 & 03.
function vieAllEmpByMan() {

    connection.query("SELECT * FROM department", function(err, data) {
        console.table(data);
        promptOne();
    });
};

// 05 - This block will add employees. C/P from 01 and "input" statements below.
function addEmp() {
    inquirer
        .prompt([{
            type: "input",
            message: "What is the employees first name?",
            name: "addEmpFirNam"
        }, {
            type: "input",
            message: "What is the employee's last name?",
            name: "addEmpLasNam"
        }, {
            type: "input",
            message: "What is the employee's role ID?",
            name: "addEmpRolId"
        }, {
            type: "input",
            message: "What is the employee's manager's ID?",
            name: "addEmpManId"
        }]).then(function(res) {
            connection.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [res.addEmpFirNam, res.addEmpLasNam, res.addEmpRolId, res.addEmpManId],
                function(err, data) {
                    if (err) throw err;
                    console.table("Employee was added");
                    promptOne();
                });
        });
};

// 06 - This block will add departments. C/P from 01 & 04.
function addDep() {
    inquirer
        .prompt([{
            type: "input",
            message: "What department would you like to add?",
            name: "depAdd"
        }]).then(function(res) {
            connection.query("INSERT INTO department (name) VALUES (?)", [res.depAdd],
                function(err, data) {
                    if (err) throw err;
                    console.table("Department was added");
                    promptOne();
                });
        });
};

// 07 - This block will add a position. C/P from 04 & 05.

function addPos() {
    inquirer
        .prompt([{
            type: "input",
            message: "What position would you like to add?",
            name: "posAdd"
        }]).then(function(res) {
            connection.query("INSERT INTO position (title, salary, department_id) values (?, ?, ?)", [res.title, res.salary, res.department_id],
                function(err, data) {
                    if (err) throw err;
                    console.table(data);
                });
            promptOne();
        });
};

// 08 - This block will update employee position. C/P from 06.

function updEmpRol() {
    inquirer
        .prompt([{
            type: "input",
            message: "What position would you like to update? (first name ONLY)",
            name: "name"
        }, {
            type: "input",
            message: "Enter the new position ID:",
            name: "number"
        }]).then(function(res) {
            connection.query("UPDATE position SET role_id = ? WHERE first_name = ?", [res.role_id, res.name],
                function(err, data) {
                    if (err) throw err;
                    console.table(data);
                });
            promptOne();
        });
};














// Info from "11-Express" week.
//     {
//         type: "input",
//         message: "What is the employee's first name?",
//         name: "sport"
//     }, {
//         type: "input",
//         message: "What is the employee's Last name?",
//         name: "sport"
//     }, {
//         type: "checkbox",
//         message: "What is your favorite color?",
//         name: "color",
//         choices: [
//             "blue",
//             "black",
//             "yellow",
//             "green"
//         ]
//     }, {
//         type: "list",
//         message: "What is your favorite size?",
//         name: "size",
//         choices: [
//             "small",
//             "medium",
//             "large"
//         ]
//     }
// ])

//     //this write a read me
// .then(function(data) {
//     var filename = data.sport + ".json";

//     fs.writeFile(filename, JSON.stringify(data, null, '\t'),
//         function(err) {
//             if (err) {
//                 return console.log(err);
//             }
//             console.log("success!");
//         });
// });