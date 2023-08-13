import { alertSuccess } from "../../utils/index.";
import { useDashboard } from "../../contexts/DashboardContext";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import * as Yup from "yup";
import Dropdown from "../../components/dropdown/Dropdown";
import FileDB from "../../FileDB/methods/DBMethods";
import InputText from "../../components/inputText/InputText";
import PageHeader from "../../components/pageHeader/PageHeader";
import React from "react";
import ReactModal from "react-modal";

const DATABASE = process.env.REACT_APP_DATABASE;

const RegisterStudentPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { currentSchool } = useDashboard();
  const [sexDropdownOpen, setSexDropdownOpen] = useState(false);
  const [clsDropdownOpen, setClsDropdownOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [classroomObjects, setClassroomObjects] = useState([]);
  const [classrooms, setClassrooms] = useState(null);

  // Styles for modal
  const customStyles = {
    overlay: {
      position: "fixed",
      top: 0,
      right: 0,
      bottom: 0,
      opacity: "1",
      backgroundColor: "#00000087",
      zIndex: 99999999999,
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      borderRadius: "8px",
    },
  };

  const createStudent = async (values) => {
    const studentCls = classroomObjects.filter((cls) => {
      return cls.name === values.classroom;
    });

    setIsLoading(true);
    const fullname = `${values.lastName} ${values.firstName}`;
    const age = values.age;
    const sex = values.sex;
    const phoneNo = values.phoneNo;
    const discount = values.discount;
    const classroom = values.classroom;
    const stuInfo = {
      fullname,
      age,
      sex,
      phoneNo,
      discount,
      classroom,
      schoolId: currentSchool?._id,
      totalFeesExpected: studentCls[0]?.classFees,
    };

    if (DATABASE === "LOCAL_STORAGE") {
      const response = await FileDB.post("students", stuInfo);
      if (response === "ok") {
        setIsLoading(false);
        alertSuccess("Student created successfully!");
        navigate("/students");
      }
    }
  };

  const getClassrooms = async () => {
    const allClassrooms = await FileDB.get(
      "classrooms",
      {
        schoolId: currentSchool?._id,
      },
      "browser"
    );
    setClassroomObjects(allClassrooms);
    const clsNames = allClassrooms.map((cls) => {
      return cls?.name;
    });
    setClassrooms(clsNames);
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstName: "",
      lastName: "",
      age: "",
      sex: "",
      phoneNo: "",
      discount: 0,
      classroom: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .required("Fistname is required")
        .min(3, "Name must be at least 3 characters")
        .max(100, "Name must not exceed 100 characters"),
      lastName: Yup.string()
        .required("Lastname is required")
        .min(3, "Name must be at least 3 characters")
        .max(100, "Name must not exceed 100 characters"),
      age: Yup.number().required("Age is required").min(1, "Minimum of 1"),
      sex: Yup.string().required("Sex is required"),
      phoneNo: Yup.string()
        .required("Phone number is required")
        .min(11, "Phone number must be 11 characters"),
      discount: Yup.number(),
      classroom: Yup.string()
        .required("Classroom is required")
        .min(3, "Classroom must be at least 3 characters"),
    }),
    onSubmit: async (values) => {
      setCreateModalOpen(true);
    },
  });

  const finalForm = useFormik({
    enableReinitialize: true,
    initialValues: {
      password: "",
    },
    validationSchema: Yup.object({
      password: Yup.string().required("Password is required."),
    }),
    onSubmit: async (values) => {
      setCreateModalOpen(false);
      createStudent({ ...formik.values, ...values });
    },
  });

  useEffect(() => {
    getClassrooms();
  }, [currentSchool]);

  return (
    <div className="pb-20">
      <PageHeader previousPath={"/students"} />
      <div className="register-student">
        <h1 className="register-student__heading">Register Student</h1>
        <h2 className="register-classroom__subheading">
          {currentSchool?.name}
        </h2>
        <form className="register-student__form" onSubmit={formik.handleSubmit}>
          {/* First name input */}
          <div className="w-full flex flex-col gap-6 lg:flex-row items-center">
            <div
              className={`w-full lg:w-[47.5%] ${
                formik.errors.lastName && !formik.errors.firstName && "mb-7"
              }`}
            >
              <InputText
                value={formik.values.firstName}
                setValue={formik.handleChange}
                id={"firstName"}
                name={"firstName"}
                label={"First name"}
                onChange={formik.handleChange}
                placeholder={"First Name"}
                isInvalid={formik.errors.firstName}
                className={"w-full flex-grow"}
                inputClassName={"w-full"}
                errorText={formik.errors?.firstName}
              />
            </div>

            {/* Last name input */}
            <div
              className={`w-full lg:w-[47.5%] ${
                formik.errors.firstName && !formik.errors.lastName && "mb-7"
              }`}
            >
              <InputText
                value={formik.values.lastName}
                setValue={formik.handleChange}
                id={"lastName"}
                name={"lastName"}
                label={"Last name"}
                onChange={formik.handleChange}
                placeholder={"Last Name"}
                isInvalid={formik.errors.lastName}
                className={"w-full flex-grow"}
                inputClassName={"w-full"}
                errorText={formik.errors?.lastName}
              />
            </div>
          </div>

          {/* Age input */}
          <div className="w-full flex flex-col gap-6 lg:flex-row items-center">
            <div
              className={`w-full lg:w-[47.5%] ${
                formik.errors.sex && !formik.errors.age && "mb-7"
              }`}
            >
              <InputText
                value={formik.values.age}
                setValue={formik.handleChange}
                id={"age"}
                name={"age"}
                label={"Age"}
                onChange={formik.handleChange}
                placeholder={"Age"}
                isInvalid={formik.errors.age}
                className={"w-full flex-grow"}
                inputClassName={"w-full"}
                errorText={formik.errors?.age}
                inputType={"number"}
              />
            </div>

            <div
              className={`w-full lg:w-[47.5%] ${
                formik.errors.age && !formik.errors.sex && "mb-7"
              }`}
            >
              <Dropdown
                dropdownOpen={sexDropdownOpen}
                setDropDownOpen={setSexDropdownOpen}
                options={["Male", "Female"]}
                value={formik.values.sex}
                onClickFunction={(value) => {
                  formik.setFieldValue("sex", value);
                }}
                label={"Sex"}
                isInvalid={formik.errors.sex}
                errorText={formik.errors?.sex}
              />
            </div>
          </div>

          {/* Classroom input */}
          <div className={`w-full`}>
            <Dropdown
              dropdownOpen={clsDropdownOpen}
              setDropDownOpen={setClsDropdownOpen}
              options={classrooms}
              value={formik.values.classroom}
              onClickFunction={(value) => {
                formik.setFieldValue("classroom", value);
              }}
              label={"Classroom"}
              isInvalid={formik.errors.classroom}
              errorText={formik.errors?.classroom}
            />
            {classrooms && classrooms.length === 0 && (
              <p className="text-sm mt-3">
                There is no classroom registered under {currentSchool?.name}.
                Please{" "}
                <span
                  className="bg-midPurple text-sm rounded-md px-2 py-1 text-white cursor-pointer"
                  onClick={() => navigate("/classrooms/register")}
                >
                  Create
                </span>{" "}
                one first before proceeding.
              </p>
            )}
          </div>

          {/* Phone Number input */}
          <div className="w-full">
            <InputText
              value={formik.values.phoneNo}
              setValue={formik.handleChange}
              id={"phoneNo"}
              name={"phoneNo"}
              label={"Phone number"}
              onChange={formik.handleChange}
              placeholder={"Phone"}
              isInvalid={formik.errors.phoneNo}
              className={"w-full flex-grow"}
              inputClassName={"w-full"}
              errorText={formik.errors?.phoneNo}
            />
          </div>

          {/* Applied Discount input */}
          <div className="w-full">
            <InputText
              value={formik.values.discount}
              setValue={formik.handleChange}
              id={"discount"}
              name={"discount"}
              label={"Applied discount"}
              onChange={formik.handleChange}
              placeholder={"Discount"}
              isInvalid={formik.errors.discount}
              className={"w-full flex-grow"}
              inputClassName={"w-full"}
              errorText={formik.errors?.discount}
              inputType={"number"}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="standard-btn-1 w-full"
          >
            {isLoading ? "Creating..." : "Create student"}
          </button>

          {/* Password for authentication */}
          <ReactModal
            isOpen={createModalOpen}
            onRequestClose={() => setCreateModalOpen(false)}
            style={customStyles}
            ariaHideApp={false}
            shouldCloseOnOverlayClick={true}
            contentLabel="Create classroom Modal"
            className="absolute bg-white"
          >
            <form className="delete-modal" onSubmit={finalForm.handleSubmit}>
              <div className="self-center">
                <p className="text-sm">Please enter Admin password.</p>
              </div>
              <div className="w-full">
                <InputText
                  value={finalForm.values.password}
                  setValue={finalForm.handleChange}
                  id={"password"}
                  name={"password"}
                  label={"Enter password"}
                  onChange={finalForm.handleChange}
                  placeholder={"Password"}
                  isInvalid={finalForm.errors.password}
                  className={"w-full"}
                  inputClassName={"w-full"}
                  errorText={finalForm.errors?.password}
                />
                <button
                  type="submit"
                  className="standard-btn-1 w-full mt-5"
                  disabled={isLoading}
                >
                  Submit
                </button>
              </div>
            </form>
          </ReactModal>
        </form>
      </div>
    </div>
  );
};

export default RegisterStudentPage;
