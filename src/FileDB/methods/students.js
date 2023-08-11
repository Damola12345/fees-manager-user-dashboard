// Prototype for a Student object

import uuid from "react-uuid";
import {
  deleteLocalStorageItem,
  editLocalStorageItem,
  getLocalStorageItem,
  setLocalStorageItems,
} from "../../utils/index.";
import raw from "../database/students.txt";

class StudentObject {
  constructor(fullname, age, sex, phoneNo, discount, student, schoolId) {
    this.fullname = fullname;
    this.age = age;
    this.sex = sex;
    this.phoneNo = phoneNo;
    this.discount = discount;
    this.student = student;
    this.schoolId = schoolId;
    this.totalFeesExpected = 0;
    this.totalPaidFees = 0;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}

const students = [];

class StudentMethods {
  async create(data) {
    // Function to create a student
    const user = localStorage.getItem("user");
    const allStudents = await getLocalStorageItem("students");
    const newStu = {
      _id: uuid(),
      ...data,
      noOfStudents: 0,
      totalFeesExpected: 0,
      totalPaidFees: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    allStudents.push(newStu);
    setLocalStorageItems("students", allStudents);
    return "ok";
  }

  async get(filter, storage) {
    // Function to get a student
    if (storage === "file") {
      let students;
      let results = [];
      let contains = true;
      let filterKeys = [];

      if (filter) {
        filterKeys = Object.keys(filter);
      }

      await fetch(raw)
        .then((data) => data.text())
        .then((text) => {
          students = JSON.parse(text);
          filter &&
            students?.map((student) => {
              contains = true;
              filterKeys?.map((key) => {
                if (student[key] !== filter[key]) contains = false;
              });
              if (contains) results.push(student);
            });
        });
      return filterKeys.length > 0 ? results : students;
    }
    if (storage === "browser") {
      return getLocalStorageItem("students", filter);
    }
  }

  async edit(filter, data) {
    // Function to edit student
    return editLocalStorageItem("students", filter, {
      ...data,
      updatedAt: new Date(),
    });
  }

  async delete(filter) {
    // Function to delete student
    // COME BACK TO IMPLEMENT CASCADE DELETE!!!
    return deleteLocalStorageItem("students", filter);
  }
}

export default new StudentMethods();
