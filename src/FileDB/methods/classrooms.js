// Prototype for a Classroom object

import raw from "../database/classrooms.txt";

class ClassroomObject {
  constructor(name, schoolId, classTeacher, fees) {
    this.schoolId = schoolId;
    this.name = name;
    this.classTeacher = classTeacher;
    this.noOfstudents = 0;
    this.classFees = fees;
    this.totalFeesExpected = 0;
    this.totalFees = 0;
    this.createdAt = new Date;
    this.updatedAt = new Date;
  }
}

const classrooms = [];

class ClassroomMethods {
  async create() {
    // Function to create a Classroom
  }

  async get(filter) {
    // Function to get a Classroom
    let classrooms;
    let results = [];
    let contains = true;
    const keys = Object.keys(filter);

    await fetch(raw)
      .then((data) => data.text())
      .then((text) => {
        classrooms = JSON.parse(text);
        classrooms.map((classroom) => {
          contains = true;
          keys.map((key) => {
            if (classroom[key] !== filter[key]) contains = false;
          })
          if (contains) results.push(classroom)
        })
      });
    return (keys.length > 0 ? results : classrooms);
  }

  async edit() {
    // Function to edit Classroom
  }

  async delete() {
    // Function to delete Classroom
  }
}

export default new ClassroomMethods();
