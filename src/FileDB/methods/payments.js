// Prototype for a Classroom object

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
    transactionNo,
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
    this.createdAt = new Date;
  }
}
  
const payments = [];

class PaymentMethods {
  async create() {
    // Function to create a Payment
  }

  async get(filter) {
    // Function to get a Payment
    let payments;
    let results = [];
    let contains = true;
    const keys = Object.keys(filter);

    await fetch(raw)
      .then((data) => data.text())
      .then((text) => {
        payments = JSON.parse(text);
        payments.map((payment) => {
          contains = true;
          keys.map((key) => {
            if (payment[key] !== filter[key]) contains = false;
          })
          if (contains) results.push(payment)
        })
      });
    return (keys.length > 0 ? results : payments);
  }

  async edit() {
    // Function to edit Payment
  }

  async delete() {
    // Function to delete Payment
  }
}

export default new PaymentMethods();
