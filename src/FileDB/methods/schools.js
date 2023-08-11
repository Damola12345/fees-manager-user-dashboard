// Prototype for a School object

import {
  deleteLocalStorageItem,
  editLocalStorageItem,
  getLocalStorageItem,
  setLocalStorageItems,
} from "../../utils/index.";
import raw from "../database/schools.txt";
import uuid from "react-uuid";

class SchoolObject {
  constructor(ownerId, name, address, level, noOfClassrooms = 0) {
    this.ownerId = ownerId;
    this.name = name;
    this.address = address;
    this.level = level;
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.noOfClassrooms = noOfClassrooms;
    this.noOfStudents = 0;
    this.totalFees = 0;
  }
}

const schools = [];

class SchoolMethods {
  async create(data) {
    // Function to create a School
    const user = localStorage.getItem("user");
    const allSchools = await getLocalStorageItem("schools");
    const newSch = {
      _id: uuid(),
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
      noOfStudents: 0,
      ownerId: user._id,
      totalFees: 0,
    };

    allSchools.push(newSch);
    setLocalStorageItems("schools", allSchools);
    return "ok";
  }

  async get(filter, storage) {
    // Function to get a School
    if (storage === "file") {
      let schools;

      await fetch(raw)
        .then((data) => data.text())
        .then((text) => {
          schools = JSON.parse(text);
        });
      return schools;
    } else {
      const schools = await getLocalStorageItem("schools", filter);
      return schools;
    }
  }

  async edit(filter, data) {
    // Function to edit School
    return editLocalStorageItem("schools", filter, {
      ...data,
      updatedAt: new Date(),
    });
  }

  async delete(filter) {
    // Function to delete School
    // COME BACK TO IMPLEMENT CASCADE DELETE!!!
    return deleteLocalStorageItem("schools", filter);
  }
}

export default new SchoolMethods();
