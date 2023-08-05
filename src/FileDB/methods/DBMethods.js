import UserMethods from "./users";
import SchoolMethods from "./schools";
import ClasroomMethods from "./classrooms";
import StudentMethods from "./students";
import PaymentMethods from "./payments";

class FileDB {
  constructor() {
    this.mapCollection = {
      users: UserMethods,
      schools: SchoolMethods,
      classrooms: ClasroomMethods,
      students: StudentMethods,
      payments: PaymentMethods,
    };
  }

  async get(collectionName, filter, storage) {
    // Read file system to get data
    const func = await this.mapCollection[collectionName];
    const data = func.get(filter, storage);
    return data;
  }

  async post(collectionName, data) {
    // Read file system to create data
    const func = await this.mapCollection[collectionName];
    const res = func.create(data);
    return res;
  }

  async put(collectionName, filter, data) {
    // Read file system to edit data
    const func = await this.mapCollection[collectionName];
    const res = func.edit(filter, data);
    return res;
  }

  async del(collectionName, filter) {
    // Read file system to delete data
    const func = await this.mapCollection[collectionName];
    const res = func.delete(filter);
    return res;
  }
}

export default new FileDB();
