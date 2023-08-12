import { alertSuccess } from "../../utils/index.";
import { ReactComponent as RefreshIcon } from "../../assets/svg/refresh.svg";
import { useDashboard } from "../../contexts/DashboardContext";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import * as Yup from "yup";
import Dropdown from "../../components/dropdown/Dropdown";
import FileDB from "../../FileDB/methods/DBMethods";
import InputText from "../../components/inputText/InputText";
import PageHeader from "../../components/pageHeader/PageHeader";
import ReactModal from "react-modal";
import { config } from "../../app.config";

const DATABASE = process.env.REACT_APP_DATABASE;

const EditClassroom = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [clsDropdownOpen, setClsDropdownOpen] = useState(false);
  const { currentSchool } = useDashboard();
  const [classroom, setClassroom] = useState({});

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

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      classTeacher: classroom?.classTeacher,
      feesPerChild: classroom?.classFees,
      classroomName: classroom?.name,
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
    onSubmit: async (values) => {
      let changed = false;
      Object.keys(values).map((key) => {
        if (values[key] !== formik.initialValues[key]) {
          changed = true;
        }
      });
      changed && setEditModalOpen(true);
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
    onSubmit: async () => {
      setEditModalOpen(false);
      editClassroom();
    },
  });

  const editClassroom = async () => {
    if (DATABASE === "LOCAL_STORAGE") {
      setIsLoading(true);
      const response = await FileDB.put(
        "classrooms",
        { _id: classroom?._id },
        {
          classTeacher: formik.values.classTeacher,
          classFees: formik.values.feesPerChild,
          name: formik.values.classroomName,
        }
      );
      setIsLoading(false);
      alertSuccess("Classroom updated successfully!");
      navigate(window.location.pathname?.split("/edit")[0]);
    }
  };

  const getClassroom = async () => {
    if (DATABASE === "LOCAL_STORAGE") {
      setIsLoading(true);
      const filter = { _id: window.location.pathname.split("/")[2] };
      const clsArray = await FileDB.get("classrooms", filter, "browser");
      setClassroom(clsArray[0]);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getClassroom();
  }, []);

  return (
    <div className="w-full pb-20">
      <PageHeader
        previousPath={window.location.pathname?.split("/edit")[0]}
        cta={
          <button
            className="standard-btn-1 w-[250px]"
            onClick={formik.resetForm}
          >
            <RefreshIcon fill="white" />
            Reset
          </button>
        }
      />

      <div className="register-school">
        <h1 className="register-school__heading">Edit classroom</h1>
        <form onSubmit={formik.handleSubmit} className="register-school__form">
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
            {isLoading ? "Editing..." : "Edit classroom"}
          </button>

          <ReactModal
            isOpen={editModalOpen}
            onRequestClose={() => setEditModalOpen(false)}
            style={customStyles}
            ariaHideApp={false}
            shouldCloseOnOverlayClick={true}
            contentLabel="Create school Modal"
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

export default EditClassroom;
