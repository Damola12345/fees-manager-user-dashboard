// Prototype for a Student object

import raw from "../database/students.txt";

class StudentObject {
  constructor(fullname, age, sex, phoneNo, discount, classroom, schoolId) {
    this.fullname = fullname;
    this.age = age;
    this.sex = sex;
    this.phoneNo = phoneNo;
    this.discount = discount;
    this.classroom = classroom;
    this.schoolId = schoolId;
    this.totalFeesExpected = 0;
    this.totalPaidFees = 0;
    this.createdAt = new Date;
    this.updatedAt = new Date;
  }
}

const students = [];

class StudentMethods {
  async create() {
    // Function to create a student
  }

  async get(filter = {}) {
    // Function to get a student
    let students;
    let results = [];
    let contains = true;
    const keys = Object.keys(filter);

    await fetch(raw)
      .then((data) => data.text())
      .then((text) => {
        students = JSON.parse(text);
        students.map((student) => {
          contains = true;
          keys.map((key) => {
            if (student[key] !== filter[key]) contains = false;
          })
          if (contains) results.push(student)
        })
      });
    return (keys.length > 0 ? results : students);
  }

  async edit() {
    // Function to edit student
  }

  async delete() {
    // Function to delete student
  }
}

export default new StudentMethods();
