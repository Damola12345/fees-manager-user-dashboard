import "./RegisterStudentPage.css";
import { alertMessage } from "../../GlobalFunctions/GlobalFunctions";
import { Loader } from "../../components/Loader/Loader";
import { useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import BigBtn from "../../components/BigBtn/BigBtn";
import PreviousIcon from "../../components/PreviousIcon/PreviousIcon";
import React from "react";
import SelectionDropdown from "../../components/SelectionDropdown/SelectionDropdown";
import { useFormik } from "formik";
import * as Yup from "yup";
import { alertSuccess } from "../../utils/index.";
import FileDB from "../../FileDB/methods/DBMethods";

const BACKEND_HOST = process.env.REACT_APP_BACKEND_HOST;
const DATABASE = process.env.REACT_APP_DATABASE;

const RegisterStudentPage = () => {
  const navigate = useNavigate();
  const itemsRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [nextStep, setNextStep] = useState(false);
  //const [sex, setSex] = useState(null);

  const [classrooms, setClassrooms] = useState([]);

  /* useEffect(() => {
    alertMessage('', 'none', 'green');
    fetch(`${BACKEND_HOST}/classrooms?schoolName=${localStorage.currentSchool}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: "include",
    })
    .then((response) => {
      if (response.ok) { 
        response.json().then((data) => {
          const classList = data.success.sort().map((cls) => {
              return cls.name;
          })
          classList.sort();
          setClassrooms(classList)
        });
      } else if(response.status === 401) {
        navigate('/login');
      } else {
        response.json().then((message) => {
          ///setIsLoading(false);
          //alertMessage(message.error, 'block', 'red');
        })
      }
    })
    .catch((err) => {
      //setIsLoading(false);
      //alertMessage('An error occured. Please retry', 'block', 'red');
      console.log(err.message)
    });
  }, []); */

  const createStudent = async (values) => {
    setIsLoading(true);
    const fullname = `${values.lastName} ${values.firstName}`;
    const age = values.age;
    const sex = values.sex;
    const phoneNo = values.phoneNo;
    const discount = values.discount;
    const classroom = values.classroom;
    const stuInfo = { fullname, age, sex, phoneNo, discount, classroom };

    if (DATABASE === "LOCAL_STORAGE") {
      const response = await FileDB.post("students", stuInfo);
      if (response === "ok") {
        setIsLoading(false);
        alertSuccess("Student created successfully!");
        navigate("/students");
      }
    }
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstName: "",
      lastName: 0,
      age: "",
      sex: "",
      phoneNo: "",
      discount: 0,
      classroom: "",
      password: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .required("Fistname is required")
        .min(5, "Name must be at least 3 characters")
        .max(100, "Name must not exceed 100 characters"),
      lastName: Yup.string()
        .required("Lastname is required")
        .min(5, "Name must be at least 3 characters")
        .max(100, "Name must not exceed 100 characters"),
      age: Yup.number().required("Age is required").min(1, "Minimum of 1"),
      sex: Yup.string().required("Sex is required"),
      phoneNo: Yup.string()
        .required("Phone number is required")
        .min(11, "Phone number must be 11 characters"),
      discount: Yup.number(),
      password: Yup.string().required("Password is required."),
      classroom: Yup.string()
        .required("Classroom is required")
        .min(5, "Classroom must be at least 3 characters"),
      password: Yup.string().required("Password is required."),
    }),
    onSubmit: async (values) => {
      setNextStep(false);
      setIsLoading(true);
      const response = await createStudent(values);
      if (response === "ok") {
        alertSuccess("Student created successfully");
        navigate("/students");
      }
      //formik.resetForm();
    },
  });

  /* const createStudent = (event) => {
    setIsLoading(true);
    event.preventDefault();

    const firstname = event.target.firstname.value;
    const lastname = event.target.lastname.value;
    const age = event.target.age.value;
    const sex = event.target.sex.value;
    const phoneNo = event.target.phoneNo.value;
    const discount = event.target.discount.value || 0;
    const password = event.target.password.value;
    const classroom = itemsRef.current.getItems();
    const schoolName = localStorage.currentSchool;
    const stuInfo = JSON.stringify({
      firstname,
      lastname,
      age,
      sex,
      phoneNo,
      discount,
      password,
      classroom: classroom[0],
      schoolName,
    });

    alertMessage("", "none", "red");
    fetch(`${BACKEND_HOST}/register-student`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: stuInfo,
    })
      .then((response) => {
        if (response.ok) {
          response.json().then((message) => {
            alertMessage(message.success, "block", "green");
            setTimeout(() => {
              setIsLoading(false);
              navigate("/students");
            }, 2000);
          });
        } else if (response.status === 401) {
          navigate("/login");
        } else {
          response.json().then((message) => {
            console.log("inside");
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

  // Get a list of classrooms

  return (
    <div id="student-reg-container">
      <div id="prev-icon">
        <PreviousIcon path={-1} />
      </div>
      <h1 id="reg-student-title">{localStorage.currentSchool}</h1>
      <div id="login-signup-msg">
        <h3 id="err-msg"></h3>
      </div>
      {isLoading ? (
        <Loader loadingText={"Adding student to records..."} />
      ) : (
        <form className="student-reg-form" onSubmit={formik.handleSubmit}>
          <h2 className="form-title">Register student</h2>

          {/* First name input */}
          <div className="flex flex-col gap-1">
            <label htmlFor="firstName" className="pl-1 flex flex-row gap-1">
              First name
              <span className={`text-[red]`}>*</span>
            </label>
            <input
              type="text"
              placeholder="First name"
              name="firstName"
              id="firstName"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="px-5 py-1 xl:w-[300px] outline-[purple] border-[grey] border-[0.5px] border-opacity-90"
            />
            {formik.touched.firstName && formik.errors.firstName && (
              <p className="text-sm text-[red]">{formik.errors.firstName}</p>
            )}
          </div>

          {/* Last name input */}
          <div className="flex flex-col gap-1">
            <label htmlFor="lastName" className="pl-1 flex flex-row gap-1">
              Last name
              <span className={`text-[red]`}>*</span>
            </label>
            <input
              type="text"
              placeholder="Last name"
              name="lastName"
              id="lastName"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="px-5 py-1 xl:w-[300px] outline-[purple] border-[grey] border-[0.5px] border-opacity-90"
            />
            {formik.touched.lastName && formik.errors.lastName && (
              <p className="text-sm text-[red]">{formik.errors.lastName}</p>
            )}
          </div>

          {/* Age input */}
          <div className="flex flex-col gap-1">
            <label htmlFor="age" className="pl-1 flex flex-row gap-1">
              Age
              <span className={`text-[red]`}>*</span>
            </label>
            <input
              type="number"
              placeholder="Age"
              name="age"
              id="age"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="px-5 py-1 xl:w-[300px] outline-[purple] border-[grey] border-[0.5px] border-opacity-90"
            />
            {formik.touched.age && formik.errors.age && (
              <p className="text-sm text-[red]">{formik.errors.age}</p>
            )}
          </div>

          {/* Classroom input */}
          <div className="flex flex-col gap-1">
            <label htmlFor="classroom" className="pl-1 flex flex-row gap-1">
              Classroom
              <span className={`text-[red]`}>*</span>
            </label>
            <input
              type="text"
              placeholder="Classroom"
              name="classroom"
              id="classroom"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="px-5 py-1 xl:w-[300px] outline-[purple] border-[grey] border-[0.5px] border-opacity-90"
            />
            {formik.touched.classroom && formik.errors.classroom && (
              <p className="text-sm text-[red]">{formik.errors.classroom}</p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <p className="form-text">Sex</p>
            <select
              className="sex-dropdown"
              required
              name="sex"
              id="sex"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <option value="Male">Male</option>

              <option value="Female">Female</option>
            </select>
            {formik.touched.sex && formik.errors.sex && (
              <p className="text-sm text-[red]">{formik.errors.sex}</p>
            )}
          </div>

          {/* Phone Number input */}
          <div className="flex flex-col gap-1">
            <label htmlFor="phoneNo" className="pl-1 flex flex-row gap-1">
              Phone Number
              <span className={`text-[red]`}>*</span>
            </label>
            <input
              type="text"
              placeholder="Phone Number"
              name="phoneNo"
              id="phoneNo"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="px-5 py-1 xl:w-[300px] outline-[purple] border-[grey] border-[0.5px] border-opacity-90"
            />
            {formik.touched.phoneNo && formik.errors.phoneNo && (
              <p className="text-sm text-[red]">{formik.errors.phoneNo}</p>
            )}
          </div>

          {/* Applied Discount input */}
          <div className="flex flex-col gap-1">
            <label htmlFor="discount" className="pl-1 flex flex-row gap-1">
              Applied Discount
            </label>
            <input
              type="text"
              placeholder="Applied Discount"
              name="discount"
              id="discount"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="px-5 py-1 xl:w-[300px] outline-[purple] border-[grey] border-[0.5px] border-opacity-90"
            />
            {formik.touched.discount && formik.errors.discount && (
              <p className="text-sm text-[red]">{formik.errors.discount}</p>
            )}
          </div>
          {/* <SelectionDropdown
            dropdownName="student classroom"
            mode="single"
            ref={itemsRef}
            items={classrooms}
          />
          <p style={{ color: "grey" }}>
            If you don't see the desired classroom from the dropdown, please
            proceed to create a new classroom before registering the student
          </p>
          <div
            id="go-to-create"
            onClick={() => {
              navigate("/register-classroom");
            }}
          >
            <BigBtn text="create new classroom" />
          </div> */}

          <button
            onClick={() => {
              const errors = Object.keys(formik.errors);
              errors.length === 1 &&
                errors[0] === "password" &&
                setNextStep(true);
            }}
            type="submit"
            className={`
              ${isLoading ? "cursor-wait opacity-70" : "cursor-pointer"}
              w-full bg-midPurple text-white py-3 rounded-lg mt-10
              `}
          >
            {isLoading ? "Creating..." : "Create classroom"}
          </button>

          {/* Password for authentication */}
          <div
            className={`fixed w-full h-full bg-black z-[999999999] top-0
            flex items-center justify-center bg-black bg-opacity-40
            ${nextStep ? "flex" : "hidden"}`}
          >
            <div className="flex flex-col items-center justify-center w-[350px] h-[250px] bg-white shadow-xl px-10 rounded-lg gap-5">
              <div className="flex flex-col gap-1">
                <label htmlFor="password" className="pl-1 flex flex-row gap-1">
                  Password
                  <span className={`text-[red]`}>*</span>
                </label>
                <input
                  type="text"
                  placeholder="Password"
                  name="password"
                  id="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="px-5 py-1 outline-[purple] border-[grey] border-[0.5px] border-opacity-90"
                />
                {formik.touched.password && formik.errors.password && (
                  <p className="text-sm text-[red]">{formik.errors.password}</p>
                )}
              </div>
              <button
                type="submit"
                className="w-full bg-midPurple py-2 text-white rounded-[5px] text-sm font-bold"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default RegisterStudentPage;
