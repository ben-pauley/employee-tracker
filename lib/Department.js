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
}

module.exports = Department;
