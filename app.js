const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const teamMembers = []; 
const idArray = [];


function askedQuestions() {

    function createManager() {
        console.log ("Please build your team."); 
        inquirer.prompt([
            {
                type: "input",
                name: "managerName",
                message: "Please type your managers name: ",
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    } else {
                        return "Please enter at least one character for your managers name."; 
                    }
                }
            },
            {
                type: "input",
                name: "managerId",
                message: "Please enter your manager's ID: ",
                validate: answer => {
                    const id = answer.match(
                        /^[1-9]\d*$/ // The ID must be an interval between 1-9. 
                    );
                    if (id) {
                        return true; 
                    }
                    return "Please enter numbers between 1-9."     
                    }
            },
            {
                type: "input",
                name: "managerEmail",
                message: "Please enter your manager's email: "
            },
            {
                type: "input",
                name: "managersOfficeNumber",
                message: "Please enter your manager's office phone number: ",
                validate: answer => {
                    const id = answer.match(
                        /^[1-9]\d*$/ // The ID must be an interval between 1-9. 
                    );
                    if (id) {
                        return true; 
                    }
                    return "Please enter numbers between 1-9."     
                    }
            }
        ]).then(answers => {
            const manager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOfficeNumber);
            teamMembers.push(manager);
            idArray.push(answers.managerId);
            createTeam();
          });
        }

    function createTeam() {
        inquirer.prompt([
            {
                type: "list",
                name: "memberChoice",
                message: "Which type of team member would you like to add?",
                choices: [
                  "Engineer",
                  "Intern",
                  "I don't want to add any more team members"
                ]
              }
            ]).then(userChoice => {
              switch(userChoice.memberChoice) {
              case "Engineer":
                addEngineer();
                break;
              case "Intern":
                addIntern();
                break;
              default:
                buildTeam();
              }
            });        
    }
    
    createManager();
}

askedQuestions();
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
