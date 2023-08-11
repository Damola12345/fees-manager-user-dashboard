// Prototype for a Classroom object

import uuid from "react-uuid";
import {
  deleteLocalStorageItem,
  editLocalStorageItem,
  getLocalStorageItem,
  setLocalStorageItems,
} from "../../utils/index.";
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
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}

const classrooms = [];

class ClassroomMethods {
  async create(data) {
    // Function to create a Classroom
    const user = localStorage.getItem("user");
    const allClassrooms = await getLocalStorageItem("classrooms");
    const school = await getLocalStorageItem("currentSchool");
    const newCls = {
      _id: uuid(),
      schoolId: school._id,
      ...data,
      noOfStudents: 0,
      totalFeesExpected: 0,
      totalFees: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    allClassrooms.push(newCls);
    setLocalStorageItems("classrooms", allClassrooms);
    return "ok";
  }

  async get(filter, storage) {
    // Function to get a Classroom
    if (storage === "file") {
      let classrooms;
      let results = [];
      let contains = true;
      let filterKeys = [];

      if (filter) {
        filterKeys = Object.keys(filter);
      }

      await fetch(raw)
        .then((data) => data.text())
        .then((text) => {
          classrooms = JSON.parse(text);
          filter &&
            classrooms?.map((classroom) => {
              contains = true;
              filterKeys?.map((key) => {
                if (classroom[key] !== filter[key]) contains = false;
              });
              if (contains) results.push(classroom);
            });
        });
      return filterKeys.length > 0 ? results : classrooms;
    }
    if (storage === "browser") {
      return getLocalStorageItem("classrooms", filter);
    }
  }

  async edit(filter, data) {
    // Function to edit Classroom
    return editLocalStorageItem("classrooms", filter, {
      ...data,
      updatedAt: new Date(),
    });
  }

  async delete(filter) {
    // Function to delete Classroom
    // COME BACK TO IMPLEMENT CASCADE DELETE!!!
    return deleteLocalStorageItem("classrooms", filter);
  }
}

export default new ClassroomMethods();
