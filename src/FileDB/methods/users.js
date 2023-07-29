// Handle user operations for file database system

import { v4 as uuid } from 'uuid';
import raw from "../database/users.txt";

class UserMethods {

  async get(filter = {}) {
    // Function to get a user
    let users;
    let results = [];
    let contains = true;
    const keys = Object.keys(filter);

    await fetch(raw)
      .then((data) => data.text())
      .then((text) => {
        users = JSON.parse(text);
        users.map((user) => {
          contains = true;
          keys.map((key) => {
            if (user[key] !== filter[key]) contains = false;
          })
          if (contains) results.push(user)
        })
      });
    return (keys.length > 0 ? results : users);
  }

  /* async create(data) {
    // Function to create a user
    let users;
    await fetch(raw)
      .then((data) => data.text())
      .then((text) => {
        users = JSON.parse(text);
      });
    
    users.push({
      _id: uuid(),
      ...data,
      createdAt: new Date,
      updatedAt: new Date,
      password: hashPwd(data.password),
    });
    console.log(users)

    await fetch('users.txt', {
      method: 'POST',
      body: data,
    })
    .then((data) => console.log(data.status))
  }

  async edit(filter, data) {
    // Function to edit user
  }

  async delete(filter) {
    // Function to delete user
  } */
}

export default new UserMethods();
