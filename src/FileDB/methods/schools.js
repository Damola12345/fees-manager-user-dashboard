// Prototype for a School object

import raw from "../database/schools.txt";

class SchoolObject {
  constructor(ownerId, name, address, level, noOfClassrooms = 0) {
    this.ownerId = ownerId;
    this.name = name;
    this.address = address;
    this.level = level;
    this.createdAt = new Date;
    this.updatedAt = new Date;
    this.noOfClassrooms = noOfClassrooms;
    this.noOfStudents = 0;
    this.totalFees = 0;
  }
}

const schools = [];

class SchoolMethods {
  async Create() {
    // Function to create a School
  }

  async get(filter) {
    // Function to get a School
    let schools;
    let results = [];
    let contains = true;
    const keys = Object.keys(filter);

    await fetch(raw)
      .then((data) => data.text())
      .then((text) => {
        schools = JSON.parse(text);
        schools.map((school) => {
          contains = true;
          keys.map((key) => {
            if (school[key] !== filter[key]) contains = false;
          })
          if (contains) results.push(school)
        })
      });
    return (keys.length > 0 ? results : schools);
  }

  async Edit() {
    // Function to edit School
  }

  async Delete() {
    // Function to delete School
  }
}

export default new SchoolMethods();
