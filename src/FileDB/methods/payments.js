// Prototype for a Classroom object

import uuid from "react-uuid";
import { getLocalStorageItem, setLocalStorageItems } from "../../utils/index.";
import raw from "../database/payments.txt";

class ClassroomObject {
  constructor(
    depositorName,
    email,
    studentName,
    studentId,
    studentClass,
    amount,
    purpose,
    schoolId,
    refNo,
    status,
    message,
    transactionNo
  ) {
    this.depositorName = depositorName;
    this.email = email;
    this.studentName = studentName;
    this.studentId = studentId;
    this.studentClass = studentClass;
    this.amount = amount;
    this.purpose = purpose;
    this.schoolId = schoolId;
    this.referenceNo = refNo;
    this.status = status;
    this.paymentMessage = message;
    this.transactionNo = transactionNo;
    this.createdAt = new Date();
  }
}

const payments = [];

class PaymentMethods {
  async create(data) {
    // Function to create a Payment
    const allPayments = await getLocalStorageItem("payments");
    const school = await getLocalStorageItem("currentSchool");
    const newPayment = {
      _id: uuid(),
      schoolId: school._id,
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    allPayments.push(newPayment);
    setLocalStorageItems("payments", allPayments);
    return "ok";
  }

  async get(filter, storage) {
    // Function to get a Payment
    if (storage === "file") {
      let payments;
      let results = [];
      let contains = true;
      let filterKeys = [];

      if (filter) {
        filterKeys = Object.keys(filter);
      }

      await fetch(raw)
        .then((data) => data.text())
        .then((text) => {
          payments = JSON.parse(text);
          filter &&
            payments?.map((payment) => {
              contains = true;
              filterKeys?.map((key) => {
                if (payment[key] !== filter[key]) contains = false;
              });
              if (contains) results.push(payment);
            });
        });
      return filterKeys.length > 0 ? results : payments;
    }
    if (storage === "browser") {
      return getLocalStorageItem("payments", filter);
    }
  }

  async edit() {
    // Function to edit Payment
  }

  async delete() {
    // Function to delete Payment
  }
}

export default new PaymentMethods();
