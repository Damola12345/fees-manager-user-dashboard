import "./RegisterClassroomPage.css";
import {
  alertMessage,
  alertSuccess,
} from "../../GlobalFunctions/GlobalFunctions";
import { Loader } from "../../components/Loader/Loader";
import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import BigBtn from "../../components/BigBtn/BigBtn";
import PreviousIcon from "../../components/PreviousIcon/PreviousIcon";
import React from "react";
import SelectionDropdown from "../../components/SelectionDropdown/SelectionDropdown";
import { useFormik } from "formik";
import * as Yup from "yup";
import FileDB from "../../FileDB/methods/DBMethods";

const BACKEND_HOST = process.env.REACT_APP_BACKEND_HOST;
const DATABASE = process.env.REACT_APP_DATABASE;

const RegisterClassroomPage = () => {
  const navigate = useNavigate();
  const itemsRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [nextStep, setNextStep] = useState(false);

  /* const createClassroom = (event) => {
    setIsLoading(true);
    event.preventDefault();
    const classTeacher = localStorage.currentSchool;
    const classTeacher = event.target.classTeacher.value;
    const fees = event.target.fees.value;
    const password = event.target.password.value;
    const classroomName = itemsRef.current.getItems();
    const clsInfo = JSON.stringify({
      classTeacher,
      classTeacher,
      fees,
      classroomName: classroomName[0],
      password,
    });

    alertMessage("", "none", "red");
    fetch(`${BACKEND_HOST}/create-classroom`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: clsInfo,
    })
      .then((response) => {
        if (response.ok) {
          response.json().then((message) => {
            alertMessage(message.success, "block", "green");
            setTimeout(() => {
              setIsLoading(false);
              navigate("/classrooms");
            }, 2000);
          });
        } else if (response.status === 401) {
          navigate("/login");
        } else {
          response.json().then((message) => {
            setTimeout(() => {
              setIsLoading(false);
              alertMessage(message.error, "block", "red");
            }, 2000);
          });
        }
      })
      .catch((err) => {
        setIsLoading(false);
        alertMessage("An error occured. Please retry", "block", "red");
        console.log(err.message);
      });
  }; */

  const createClassroom = async (values) => {
    setIsLoading(true);
    const name = values.classroomName;
    const classTeacher = values.classTeacher;
    const classFees = values.feesPerChild;
    const clsInfo = { name, classTeacher, classFees };

    if (DATABASE === "LOCAL_STORAGE") {
      const response = await FileDB.post("classrooms", clsInfo);
      if (response === "ok") {
        setIsLoading(false);
        alertSuccess("Classroom created successfully!");
        navigate("/classrooms");
      }
    }
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      classTeacher: "",
      feesPerChild: 0,
      classroomName: "",
      password: "",
    },
    validationSchema: Yup.object({
      classTeacher: Yup.string()
        .required("Class teacher is required")
        .min(5, "Name must be at least 5 characters")
        .max(100, "Name must not exceed 100 characters"),
      feesPerChild: Yup.number()
        .required("Fees is required")
        .min(1000, "Minimum of 1000"),
      classroomName: Yup.string()
        .required("A class name is required")
        .min(5, "Name must be at least 5 characters")
        .max(100, "Name must not exceed 100 characters"),
      password: Yup.string().required("Password is required."),
    }),
    onSubmit: async (values) => {
      setNextStep(false);
      setIsLoading(true);
      const response = await createClassroom(values);
      if (response === "ok") {
        alertSuccess("Classroom created successfully");
        navigate("/classrooms");
      }
      //formik.resetForm();
    },
  });

  return (
    <div id="class-reg-container">
      <div className="self-start">
        <PreviousIcon path={"/classrooms"} />
      </div>
      <h1 id="reg-class-title">{localStorage.currentSchool}</h1>
      <div id="login-signup-msg">
        <h3 id="err-msg"></h3>
      </div>
      {isLoading ? (
        <Loader loadingText={"Creating classroom..."} />
      ) : (
        <div id="class-reg-container">
          <form className="class-reg-form" onSubmit={formik.handleSubmit}>
            <h2 className="form-title">Add classroom</h2>
            {/* Classs teacher input */}
            <div className="flex flex-col gap-1">
              <label
                htmlFor="classTeacher"
                className="pl-1 flex flex-row gap-1"
              >
                Class Teacher
                <span className={`text-[red]`}>*</span>
              </label>
              <input
                type="text"
                placeholder="Class Teacher"
                name="classTeacher"
                id="classTeacher"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="px-5 py-1 xl:w-[300px] outline-[purple] border-[grey] border-[0.5px] border-opacity-90"
              />
              {formik.touched.classTeacher && formik.errors.classTeacher && (
                <p className="text-sm text-[red]">
                  {formik.errors.classTeacher}
                </p>
              )}
            </div>

            {/* Fees amount input */}
            <div className="flex flex-col gap-1">
              <label
                htmlFor="feesPerChild"
                className="pl-1 flex flex-row gap-1"
              >
                Fees amount
                <span className={`text-[red]`}>*</span>
              </label>
              <input
                type="text"
                placeholder="Fees amount"
                name="feesPerChild"
                id="feesPerChild"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="px-5 py-1 xl:w-[300px] outline-[purple] border-[grey] border-[0.5px] border-opacity-90"
              />
              {formik.touched.feesPerChild && formik.errors.feesPerChild && (
                <p className="text-sm text-[red]">
                  {formik.errors.feesPerChild}
                </p>
              )}
            </div>

            {/* Classroom Name input */}
            <div className="flex flex-col gap-1">
              <label
                htmlFor="classroomName"
                className="pl-1 flex flex-row gap-1"
              >
                Classroom Name
                <span className={`text-[red]`}>*</span>
              </label>
              <input
                type="text"
                placeholder="Classroom Name"
                name="classroomName"
                id="classroomName"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="px-5 py-1 xl:w-[300px] outline-[purple] border-[grey] border-[0.5px] border-opacity-90"
              />
              {formik.touched.classroomName && formik.errors.classroomName && (
                <p className="text-sm text-[red]">
                  {formik.errors.classroomName}
                </p>
              )}
            </div>

            <SelectionDropdown
              dropdownName="classrooms"
              custom={true}
              mode="single"
              ref={itemsRef}
            />
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
                  <label
                    htmlFor="password"
                    className="pl-1 flex flex-row gap-1"
                  >
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
                    <p className="text-sm text-[red]">
                      {formik.errors.password}
                    </p>
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
        </div>
      )}
    </div>
  );
};

export default RegisterClassroomPage;
