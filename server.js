const inquirer = require("inquirer");
const cTable = require("console.table");
const database = require("./utils/Database.js");
const Employee = require("./lib/Employee.js");
const Role = require("./lib/Role.js");
const Department = require("./lib/Department.js");

let employee = new Employee(database);
let role = new Role(database);
let department = new Department(database);
