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

function addDepartment() {
  let question = "What department would you like to add?";
  inquirer
    .prompt({
      name: "department",
      type: "input",
      message: question,
    })
    .then((data) => {
      department.insertDepartment(data.department);
      start();
    });
}

function addRole() {
  let departments = ["No Department"];

  database.query("SELECT * FROM department", function (err, res) {
    if (err) throw err;

    for (let i = 0; i < res.length; i++) {
      if (res[i].name) {
        departments.push(res[i].name);
      }
    }
    let questions = [
      "What is the role title you would like to add?",
      "What is the role salary?",
      "What is the role department?",
    ];
    inquirer
      .prompt([
        {
          name: "title",
          type: "input",
          message: questions[0],
        },
        {
          name: "salary",
          type: "number",
          message: questions[1],
        },
        {
          name: "department",
          type: "list",
          message: questions[2],
          choices: departments,
        },
      ])
      .then((data) => {
        let departmentId = null;
        for (let i = 0; i < res.length; i++) {
          if (res[i].name === data.department) {
            departmentId = res[i].id;
            break;
          }
        }
        role.insertRole(data.title, data.salary, departmentId);
        start();
      });
  });
}

function addEmployee() {
  let roles = ["No Role"];
  let managers = ["No Manager"];

  database.query("SELECT * FROM role", function (err, roleRes) {
    if (err) throw err;

    for (let i = 0; i < roleRes.length; i++) {
      if (roleRes[i].title) {
        roles.push(roleRes[i].title);
      }
    }

    database.query("SELECT * from employee", function (err, empRes) {
      if (err) throw err;

      for (let i = 0; i < empRes.length; i++) {
        if (empRes[i].first_name) {
          managers.push(`${empRes[i].first_name} ${empRes[i].last_name}`);
        }
      }

      let questions = [
        "What is the employee first name?",
        "What is the employee last name?",
        "What is the employee role?",
        "Who is the employee manager?",
      ];
      inquirer
        .prompt([
          {
            name: "firstName",
            type: "input",
            message: questions[0],
          },
          {
            name: "lastName",
            type: "input",
            message: questions[1],
          },
          {
            name: "role",
            type: "list",
            message: questions[2],
            choices: roles,
          },
          {
            name: "manager",
            type: "list",
            message: questions[3],
            choices: managers,
          },
        ])
        .then((data) => {
          let roleId = null;
          for (let i = 0; i < roleRes.length; i++) {
            if (roleRes[i].title === data.role) {
              roleId = roleRes[i].id;
              break;
            }
          }

          let managerId = null;
          for (let i = 0; i < empRes.length; i++) {
            if (
              `${empRes[i].first_name} ${empRes[i].last_name}` === data.manager
            ) {
              managerId = empRes[i].id;
              break;
            }
          }
          employee.insertEmployee(
            data.firstName,
            data.lastName,
            roleId,
            managerId
          );
          start();
        });
    });
  });
}

start();
