//import { faCircleXmark, faCaretDown } from '@fortawesome/free-solid-svg-icons';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import SelectionDropdown from "../../components/SelectionDropdown/SelectionDropdown";
import "./CreatePaymentPage.css";
import { Loader } from "../../components/Loader/Loader";
import { PaystackButton } from "react-paystack";
import { useNavigate } from "react-router-dom";
import BigBtn from "../../components/BigBtn/BigBtn";
import { alertMessage } from "../../GlobalFunctions/GlobalFunctions";
import PaneOption from "../../components/PaneOption/PaneOption";
import PreviousIcon from "../../components/PreviousIcon/PreviousIcon";
import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import FileDB from "../../FileDB/methods/DBMethods";
import { alertSuccess } from "../../utils/index.";

const BACKEND_HOST = process.env.REACT_APP_BACKEND_HOST;
const DATABASE = process.env.REACT_APP_DATABASE;
const PAYSTACK_API_KEY = process.env.REACT_APP_PAYSTACK_API_KEY;

const CreatePaymentPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [students, setStudents] = useState("");
  const [studentList, setStudentList] = useState([]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: "",
      depositorName: "",
      amount: 0,
      purpose: "",
      studentName: "",
      studentId: 0,
      studentClass: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Email is required"),
      depositorName: Yup.string()
        .required("Depositor name is required")
        .min(5, "Name must be at least 3 characters")
        .max(100, "Name must not exceed 100 characters"),
      amount: Yup.number()
        .required("Amount is required")
        .min(1000, "Minimum of 1000"),
      purpose: Yup.string()
        .required("Purpose is required")
        .min(10, "Name must be at least 3 characters")
        .max(100, "Name must not exceed 100 characters"),
      studentName: Yup.string().required("Depositor name is required"),
      studentId: Yup.string().required(),
      studentClass: Yup.string().required("Classroom is required"),
    }),
    onSubmit: async (values) => {
      console.log("submitted");
      setIsLoading(true);
      //formik.resetForm();
    },
  });

  const getStudents = async () => {
    if (DATABASE === "LOCAL_STORAGE") {
      setIsLoading(true);
      const students = await FileDB.get("students", null, "browser");
      setStudents(students);
      setIsLoading(false);
    }
  };

  /* useEffect(() => {
		fetch(`${BACKEND_HOST}/students?schoolName=${localStorage.currentSchool}`, {
		  method: "GET",
		  headers: {
			'Content-Type': 'application/json',
		  },
		  credentials: "include",
		})
		.then((response) => {
		  if (response.ok) {
			  response.json().then((data) => {
				setStudents(data.success);
				setTimeout(() => {
				  setIsLoading(false);
				}, 1000);
			  });
		  } else if(response.status === 401) {
			  navigate('/login');
		  } else {
			  response.json().then((message) => {
				  setIsLoading(false);
				  alertMessage(message.error, 'block', 'red');
			  })
		  }
		})
		.catch((err) => {
		  setIsLoading(false);
		  alertMessage('An error occured. Please retry', 'block', 'red');
		  console.log(err.message)
		});
	  }, []); */

  const SearchStudent = (event) => {
    //setSearchText(event.target.value);
    if (event.target.value.length > 0) {
      const currentStudents = students.filter((stu) => {
        const name_id = stu.fullname + " - " + stu._id;
        return name_id.toLowerCase().includes(event.target.value);
      });
      setStudentList(currentStudents);
    } else {
      setStudentList([]);
    }
  };

  const savePayment = async (paystackResponse) => {
    const paymentObj = {
      depositorName: formik.values.depositorName,
      email: formik.values.email,
      studentName: formik.values.studentName,
      studentId: formik.values.studentId,
      studentClass: formik.values.studentClass,
      amount: formik.values.amount,
      purpose: formik.values.purpose,
      referenceNo: paystackResponse?.reference,
      status: paystackResponse?.status,
      paymentMessage: paystackResponse?.message,
      transactionNo: paystackResponse?.transaction,
    };

    if (DATABASE === "LOCAL_STORAGE") {
      setIsLoading(true);
      const response = await FileDB.post("payments", paymentObj);
      if (response === "ok") {
        ResetPayment();
        setIsLoading(false);
        alertSuccess("Payment successfull!");
        navigate("/payments");
      }
    }
  };

  /* const savePayment = (details) => {
    const payInfo = {
      depositorName,
      email,
      studentName,
      studentId,
      studentClass,
      amount: amount / 100,
      purpose,
      schoolName: localStorage.currentSchool,
      refNo: details.reference,
      status: details.status,
      message: details.message,
      transactionNo: details.transaction,
    };
    fetch(`${BACKEND_HOST}/save-payment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(payInfo),
    })
      .then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            setStudents(data.success);
            setTimeout(() => {
              setIsLoading(false);
              navigate("/payments");
            }, 1000);
          });
        } else if (response.status === 401) {
          navigate("/login");
        } else {
          response.json().then((message) => {
            setIsLoading(false);
            alertMessage(message.error, "block", "red");
          });
        }
      })
      .catch((err) => {
        setIsLoading(false);
        alertMessage("An error occured. Please retry", "block", "red");
        console.log(err.message);
      });
  }; */

  const SelectStudent = (stu) => {
    //alertMessage();
    const selected_stu = document.getElementById("search-stu");
    if (selected_stu)
      selected_stu.value =
        stu.fullname + " - " + "(" + stu.classroom + ") " + stu._id;
    formik.setFieldValue("studentName", stu.fullname);
    formik.setFieldValue("studentId", stu._id);
    formik.setFieldValue("studentClass", stu.classroom);
    setStudentList([]);
  };

  const ResetPayment = () => {
    formik.resetForm();
  };

  const componentProps = {
    email: formik.values.email,
    amount: formik.values.amount * 100,
    metadata: {
      depositorName: formik.values.depositorName,
      studentName: formik.values.studentName,
      studentId: formik.values.studentId,
    },
    publicKey: PAYSTACK_API_KEY,
    text: "Pay Fees",
    onSuccess: (res) => {
      //console.log(res)
      alert("Payment successful! Please check for email for a receipt");
      savePayment(res);
    },
    onClose: () => {
      setIsLoading(false);
      alert(
        "Your paymebt will not be completed. Are you sure you want to exit?"
      );
    },
  };

  const completeForm = () => {
    alertMessage("Please fill out form to proceed", "block", "red");
  };

  useEffect(() => {
    getStudents();
  }, []);

  return (
    <div id="sch-reg-container">
      <PreviousIcon path={-1} />
      <h1 id="reg-school-title">Make Payment</h1>
      {isLoading ? (
        <Loader loadingText={"Loading..."} />
      ) : (
        <div id="school-reg-container">
          {formik.values.amount &&
          formik.values.depositorName &&
          formik.values.email &&
          formik.values.purpose &&
          formik.values.studentClass &&
          formik.values.studentId &&
          formik.values.studentName ? (
            <div></div>
          ) : (
            <form className="school-reg-form" onSubmit={formik.handleSubmit}>
              {/* Depositor name input */}
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="depositorName"
                  className="pl-1 flex flex-row gap-1"
                >
                  Depositor name
                  <span className={`text-[red]`}>*</span>
                </label>
                <input
                  type="text"
                  placeholder="Depositor name"
                  name="depositorName"
                  id="depositorName"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="px-5 py-1 xl:w-[300px] outline-[purple] border-[grey] border-[0.5px] border-opacity-90"
                />
                {formik.touched.depositorName &&
                  formik.errors.depositorName && (
                    <p className="text-sm text-[red]">
                      {formik.errors.depositorName}
                    </p>
                  )}
              </div>

              {/* Depositor email input */}
              <div className="flex flex-col gap-1">
                <label htmlFor="email" className="pl-1 flex flex-row gap-1">
                  Depositor email
                  <span className={`text-[red]`}>*</span>
                </label>
                <input
                  type="text"
                  placeholder="Address"
                  name="email"
                  id="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  className="px-5 py-1 xl:w-[300px] outline-[purple] border-[grey] border-[0.5px] border-opacity-90"
                />
                {formik.touched.email && formik.errors.email && (
                  <p className="text-sm text-[red]">{formik.errors.email}</p>
                )}
              </div>

              {/* Amount input */}
              <div className="flex flex-col gap-1">
                <label htmlFor="amount" className="pl-1 flex flex-row gap-1">
                  Amount
                  <span className={`text-[red]`}>*</span>
                </label>
                <input
                  type="number"
                  placeholder="Amount"
                  name="amount"
                  id="amount"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.amount}
                  className="px-5 py-1 xl:w-[300px] outline-[purple] border-[grey] border-[0.5px] border-opacity-90"
                />
                {formik.touched.amount && formik.errors.amount && (
                  <p className="text-sm text-[red]">{formik.errors.amount}</p>
                )}
              </div>

              {/* Purpose/Description input */}
              <div className="flex flex-col gap-1">
                <label htmlFor="purpose" className="pl-1 flex flex-row gap-1">
                  Purpose/Description
                  <span className={`text-[red]`}>*</span>
                </label>
                <input
                  type="text"
                  placeholder="Purpose"
                  name="purpose"
                  id="purpose"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.purpose}
                  className="px-5 py-1 xl:w-[300px] outline-[purple] border-[grey] border-[0.5px] border-opacity-90"
                />
                {formik.touched.purpose && formik.errors.purpose && (
                  <p className="text-sm text-[red]">{formik.errors.purpose}</p>
                )}
              </div>

              <p className="form-text">Select student</p>
              <input
                id="search-stu"
                className="input-field"
                type="text"
                placeholder="Search student name and select"
                name="school-name"
                required
                onChange={SearchStudent}
              ></input>
              <div id="students-dropdown">
                {studentList.map((stu) => {
                  return (
                    <div
                      onClick={() => SelectStudent(stu)}
                      key={stu._id + stu.fullname}
                    >
                      <PaneOption
                        name={stu.fullname + " - " + "(" + stu.classroom + ")"}
                        bcolor="whitesmoke"
                      />
                    </div>
                  );
                })}
              </div>
            </form>
          )}
          {formik.values.amount &&
            formik.values.depositorName &&
            formik.values.email &&
            formik.values.purpose &&
            formik.values.studentClass &&
            formik.values.studentId &&
            formik.values.studentName && (
              <div id="student-dets">
                <p>
                  You are about to make a payment for the student with the
                  following details...
                </p>
                <p className="det" id="det-name">
                  Studen name: {formik.values.studentName}
                </p>
                <p className="det" id="det-id">
                  Student Id: {formik.values.studentId}
                </p>
                <p className="det" id="det-class">
                  Student class: {formik.values.studentClass}
                </p>
                <p className="det" id="det-amount">
                  Amount: {formik.values.amount}
                </p>
                <h4 style={{ color: "orange" }}>
                  Please confirm the details before proceeding
                </h4>
                <div
                  id="cancel-student"
                  onClick={() => {
                    ResetPayment();
                  }}
                >
                  Cancel
                </div>
              </div>
            )}

          {formik.values.amount &&
          formik.values.depositorName &&
          formik.values.email &&
          formik.values.purpose &&
          formik.values.studentClass &&
          formik.values.studentId &&
          formik.values.studentName ? (
            <div
              id="submit-pay"
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                setIsLoading(true);
              }}
            >
              <PaystackButton {...componentProps} />
            </div>
          ) : (
            <button
              onClick={() => console.log(formik.errors)}
              type="submit"
              className={`
              ${isLoading ? "cursor-wait opacity-70" : "cursor-pointer"}
              w-full bg-midPurple text-white py-3 rounded-lg mt-10
              `}
            >
              {isLoading ? "..." : "Make payment"}
            </button>
          )}
          <h5 id="pay-message">
            All payments are processed using{" "}
            <a href="https://paystack.com/" target={"blank"}>
              Paystack
            </a>{" "}
            click "Pay Fees" to continue.
          </h5>
        </div>
      )}
    </div>
  );
};

export default CreatePaymentPage;
