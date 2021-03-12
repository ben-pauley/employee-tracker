class Department {
  constructor(connection, id, name) {
    this.connection = connection;
    this.id = id;
    this.name = name;
  }

  setProperties(data) {
    Object.getOwnPropertyNames(this).forEach((property) => {
      if (property !== "connection") {
        this[property] = data[property];
      }
    });
  }

  printDepartments() {
    this.connection.query(
      "SELECT d.id, d.name " + "FROM department d ",
      (err, res) => {
        if (err) throw err;

        console.log("\n");
        console.table(res);
      }
    );
  }

  insertDepartment(departmentName = this.name) {
    this.connection.query(
      "INSERT INTO department (name) VALUES (?)",
      [departmentName],
      (err, res) => {
        if (err) throw err;
      }
    );
  }

  updateDepartment() {
    this.connection.query(
      "UPDATE department SET ? WHERE ?",
      { name: this.name },
      { id: this.id },
      (err, res) => {
        if (err) throw err;
      }
    );
  }

  deleteDepartment() {
    this.connection.query(
      "DELETE FROM department WHERE ?",
      { id: this.id },
      (err, res) => {
        if (err) throw err;
      }
    );
  }
}

module.exports = Department;
