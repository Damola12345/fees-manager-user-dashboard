import { config } from "../../app.config";
import { useDashboard } from "../../contexts/DashboardContext";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { alertSuccess } from "../../GlobalFunctions/GlobalFunctions";
import * as Yup from "yup";
import Dropdown from "../../components/dropdown/Dropdown";
import FileDB from "../../FileDB/methods/DBMethods";
import InputText from "../../components/inputText/InputText";
import PageHeader from "../../components/pageHeader/PageHeader";
import React from "react";
import ReactModal from "react-modal";

const DATABASE = process.env.REACT_APP_DATABASE;

const RegisterClassroomPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { currentSchool } = useDashboard();
  const [clsDropdownOpen, setClsDropdownOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);

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
    },
    validationSchema: Yup.object({
      classTeacher: Yup.string()
        .required("Class teacher is required")
        .min(5, "Minimum of 5 characters")
        .max(100, "Maximum of 100 characters"),
      feesPerChild: Yup.number()
        .required("Fees is required")
        .min(1000, "Minimum of 1000"),
      classroomName: Yup.string()
        .required("A class name is required")
        .min(3, "Minimum of 3 characters")
        .max(100, "Maximum of 100 characters"),
    }),
    onSubmit: async () => {
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
      createClassroom({ ...formik.values, ...values });
    },
  });

  return (
    <div className="pb-20">
      <PageHeader previousPath={"/classrooms"} />
      <div className="register-classroom">
        <h1 className="register-classroom__heading">Register Classroom</h1>
        <h2 className="register-classroom__subheading">
          {currentSchool?.name}
        </h2>
        <form
          className="register-classroom__form"
          onSubmit={formik.handleSubmit}
        >
          {/* Classs teacher input */}
          <div className="w-full">
            <InputText
              value={formik.values.classTeacher}
              setValue={formik.handleChange}
              id={"classTeacher"}
              name={"classTeacher"}
              label={"Class Teacher"}
              onChange={formik.handleChange}
              placeholder={"Name"}
              isInvalid={formik.errors.classTeacher}
              className={"w-full"}
              inputClassName={"w-full"}
              errorText={formik.errors?.classTeacher}
            />
          </div>

          {/* Fees amount input */}
          <div className="w-full">
            <InputText
              value={formik.values.feesPerChild}
              setValue={formik.handleChange}
              id={"feesPerChild"}
              name={"feesPerChild"}
              label={"Fees required"}
              onChange={formik.handleChange}
              placeholder={"Amount"}
              isInvalid={formik.errors.feesPerChild}
              className={"w-full"}
              inputClassName={"w-full"}
              errorText={formik.errors?.feesPerChild}
              inputType={"number"}
            />
          </div>

          {/* Classroom Name input */}
          <div className="w-full flex items-end justify-between">
            <div
              className={`w-[50%] xl:w-[65%] ${
                formik.errors.classroomName && "mb-7"
              }`}
            >
              <Dropdown
                dropdownOpen={clsDropdownOpen}
                setDropDownOpen={setClsDropdownOpen}
                options={
                  config.classOptions[currentSchool?.level?.toLowerCase()]
                }
                value={formik.values.classroomName}
                onClickFunction={(value) => {
                  formik.setFieldValue("classroomName", value);
                }}
                label={"Select Classroom"}
                isInvalid={formik.errors.classroomName}
              />
            </div>
            <div className="w-[45%] xl:w-[30%]">
              <InputText
                value={formik.values.classroomName}
                setValue={formik.handleChange}
                id={"classroomName"}
                name={"classroomName"}
                label={""}
                onChange={formik.handleChange}
                placeholder={"Classroom name"}
                isInvalid={formik.errors.classroomName}
                className={"w-full"}
                inputClassName={"w-full"}
                errorText={formik.errors?.classroomName}
                inputType={"text"}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="standard-btn-1 w-full"
          >
            {isLoading ? "Creating..." : "Create classroom"}
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

export default RegisterClassroomPage;
