var inquirer = require("inquirer");
var fs = require('fs');

inquirer
    .prompt([{
        type: "checkbox",
        message: "What would you like to do?",
        name: "color",
        choices: [
            "blue",
            "black",
            "yellow",
            "green"
        ]
    }, {
        type: "input",
        message: "What is the employee's first name?",
        name: "sport"
    }, {
        type: "input",
        message: "What is the employee's Last name?",
        name: "sport"
    }, {
        type: "checkbox",
        message: "What is your favorite color?",
        name: "color",
        choices: [
            "blue",
            "black",
            "yellow",
            "green"
        ]
    }, {
        type: "list",
        message: "What is your favorite size?",
        name: "size",
        choices: [
            "small",
            "medium",
            "large"
        ]
    }])

.then(function(data) {
    var filename = data.sport + ".json";

    fs.writeFile(filename, JSON.stringify(data, null, '\t'),
        function(err) {
            if (err) {
                return console.log(err);
            }
            console.log("success!");
        });
});