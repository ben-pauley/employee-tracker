const cTable = require("console.table");
const inquirer = require("inquirer");
const database = require("./utils/Database.js");
const Employee = require("./lib/Employee.js");
const Role = require("./lib/Role.js");
const Department = require("./lib/Department.js");

let employee = new Employee(database);
let role = new Role(database);
let department = new Department(database);

function start() {
  let question = "What would you like to do?";
  let options = [
    "View All Employees",
    "View Employees By Manager",
    "Add Employee",
    "Remove Employee",
    "Update Employee Role",
    "Update Employee Manager",
    "View All Roles",
    "Add Role",
    "Remove Role",
    "View All Departments",
    "Add Department",
    "Remove Department",
    "View Department Utilised Budget",
    "Exit",
  ];
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: question,
      choices: options,
    })
    .then((data) => {
      menuOptions(data);
    });
}

function menuOptions(data) {
  switch (data.action) {
    case "View All Employees":
      employee.viewEmployees();
      start();
      break;
    case "View Employees By Manager":
      employeesByManager();
      break;
    case "View All Roles":
      role.printRoles();
      start();
      break;
    case "View All Departments":
      department.printDepartments();
      start();
      break;
    case "Add Employee":
      addEmployee();
      break;
    case "Add Role":
      addRole();
      break;
    case "Add Department":
      addDepartment();
      break;
    case "Update Employee Role":
      updateEmployeeRole();
      break;
    case "Update Employee Manager":
      updateEmployeeManager();
      break;
    case "Remove Employee":
      removeEmployee();
      break;
    case "Remove Role":
      removeRole();
      break;
    case "Remove Department":
      removeDepartment();
      break;
    case "View Department Utilised Budget":
      totalBudgetUsed();
      break;
    case "Exit":
      console.log("Goodbye!");
      break;
    default:
      console.log(`Cannot perform ${data.action}.`);
      start();
      break;
  }
}

start();
