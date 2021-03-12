const Department = require("./Department.js");
const Role = require("./Role.js");

class Employee {
  constructor(connection, id, firstName, lastName, roleId, managerId) {
    this.connection = connection;
    this.id = id;
    this.first_name = firstName;
    this.last_name = lastName;
    this.role_id = roleId;
    this.manager_id = managerId;
  }

  setProperties(data) {
    Object.getOwnPropertyNames(this).forEach((property) => {
      if (property !== "connection") {
        this[property] = data[property];
      }
    });
  }
}

module.exports = Employee;
