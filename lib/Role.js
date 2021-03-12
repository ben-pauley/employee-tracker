class Role {
  constructor(connection, id = 0, title = "", salary = 0.0, departmentId = 0) {
    this.connection = connection;
    this.id = id;
    this.title = title;
    this.salary = salary;
    this.department_id = departmentId;
  }

  setProperties(data) {
    Object.getOwnPropertyNames(this).forEach((property) => {
      if (property !== "connection") {
        this[property] = data[property];
      }
    });
  }
}

module.exports = Role;
