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

    function addEngineer() {
        inquirer.prompt([
            {
                type: "input",
                name: "engineerName",
                message: "Please enter the engineer's name: ",
                validate: answer => {
                  if (answer !== "") {
                    return true;
                  }
                  return "Please enter a name of the engineer.";
                }
            },
            {
                type: "input",
                name: "engineerId",
                message: "Please enter the engineer's ID: ",
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
                name: "engineerEmail",
                message: "Please enter the engineer's email: ",
            },
            {
                type: "input",
                name: "engineerGithub",
                message: "Please enter the engineer's Github username: ",
            },
        ]).then(answers => {
            const engineer = new Engineer(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.engineerGithub);
            teamMembers.push(engineer);
            idArray.push(answers.engineerId);
            createTeam();
          });
    }
    
    function addIntern() {
        inquirer.prompt([
            {
                type: "input",
                name: "internName",
                message: "Please enter the intern's name: ",
                validate: answer => {
                  if (answer !== "") {
                    return true;
                  }
                  return "Please enter a name of the intern.";
                }
            },
            {
                type: "input",
                name: "internId",
                message: "Please enter the intern's ID: ",
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
                name: "internEmail",
                message: "Please enter the intern's email: ",
            },
            {
                type: "input",
                name: "internSchool",
                message: "Please enter the intern's school: ",
            },
        ]).then(answers => {
            const intern = new Intern(answers.internName, answers.internId, answers.internEmail, answers.internSchool);
            teamMembers.push(intern);
            idArray.push(answers.internId);
            createTeam();
          });
    }

    function buildTeam() {
        if (!fs.existsSync(OUTPUT_DIR)) {
            fs.mkdirSync(OUTPUT_DIR)
        }
        fs.writeFileSync(outputPath, render(teamMembers), "utf-8"); 
    }
    createManager();
}
askedQuestions();
