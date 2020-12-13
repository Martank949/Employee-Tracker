//Dependencies
const inquirer = require("inquirer");
const mysql = require("mysql");
const cTable = require("console.table");

//--------------------------NOT SURE YET -------------------------01
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
//--------------------------------------------------------------01
module.exports = sequelize;

//Connection information for the SQL database
var connection = mysql.createConnection({
    host: "localhost",
    //My port
    port: 3301,
    //My Username
    user: "newuser",
    //My password
    password: "xxxxxxx",
    database: "company_db"
});

//Connect to the MYSQL server and SQL database
connection.connect(function(err) {
    if (err) throw err;
    //Run the promptOne function after the connection is made to prompt the user
    promptOne();
});

//This function will prompt the user on which action to take
function promptOne() {
    //First action question
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