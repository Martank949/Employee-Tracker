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
//--------------------------------------------------------------001
module.exports = sequelize;

//Connection information for the SQL database.
var connection = mysql.createConnection({
    host: "localhost",
    //My port.
    port: 3301,
    //My Username.
    user: "newuser",
    //My password.
    password: "xxxxxxx",
    database: "company_db"
});

//Connect to the MYSQL server and SQL database.
connection.connect(function(err) {
    if (err) throw err;
    //Run the promptOne function after the connection is made to prompt the user.
    promptOne();
});

// 01 - This function will prompt the user on which action to take.
function promptOne() {
    //First action question.
    inquirer
        .prompt([{
            type: "checkbox",
            message: "What would you like to do?",
            name: "firstAction",
            choices: [
                "View All Employees",
                "View All Employees by Department",
                "View All Employees by Manager",
                "Add Employee",
                "Remove Employee",
                "Update Employee Role",
                "Update Employee Manager",
                "QUIT"
            ]
        }])
        .then(function(firstAction) {
            switch (firstAction.action) {
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

                case "Remove Employee":
                    remEmp();
                    break;

                case "Update Employee Role":
                    updEmpRol();
                    break;

                case "Update Employee Manager":
                    updEmpMan();
                    break;

                case "Quit":
                    connection.end();
                    break;
            };
        });
};

// 02 - This function will display all employees.
function vieAllEmp() {

    connection.query("SELECT * FROM employee", function(err, data) {
        console.table(data);
        promptOne();
    });
};

// 03 - This function will display all departments. C/P from 02 & update
function vieAllEmpByDep() {

    connection.query("SELECT * FROM department", function(err, data) {
        console.table(data);
        promptOne();
    });
};

// 04 - This function will add employees. C/P from 01 and "input" statements below.
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