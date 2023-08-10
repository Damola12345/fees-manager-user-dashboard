import { alertSuccess } from "../../GlobalFunctions/GlobalFunctions";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import * as Yup from "yup";
import Dropdown from "../../components/dropdown/Dropdown";
import FileDB from "../../FileDB/methods/DBMethods";
import InputText from "../../components/inputText/InputText";
import PageHeader from "../../components/pageHeader/PageHeader";
import ReactModal from "react-modal";

const DATABASE = process.env.REACT_APP_DATABASE;

const RegsisterSchoolPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [levelDropdownOpen, setLevelDropdownOpen] = useState(false);
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

  const createSchool = async (values) => {
    setIsLoading(true);
    const name = values.schoolName;
    const address = values.schoolAddress;
    const level = values.level;
    const password = values.password;
    const schInfo = { name, address, level, password };

    if (DATABASE === "LOCAL_STORAGE") {
      const response = await FileDB.post("schools", schInfo);
      if (response === "ok") {
        setIsLoading(false);
        alertSuccess("School created successfully!");
        navigate("/schools");
      }
    }
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      schoolName: "",
      schoolAddress: "",
      level: "",
      classrooms: [],
    },
    validationSchema: Yup.object({
      schoolName: Yup.string()
        .required("School name is required")
        .min(5, "Minimum of 5 characters")
        .max(100, "Maximum 100 characters"),
      schoolAddress: Yup.string()
        .required("Address is required")
        .min(5, "Minimum 5 characters")
        .max(100, "Maximum of 100 characters"),
      level: Yup.string().required("A level is required"),
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
      createSchool({ ...formik.values, ...values });
    },
  });

  return (
    <div className="pb-20 ">
      <PageHeader previousPath={"/schools"} />
      <div className="register-school">
        <h1 className="register-school__heading">Register School</h1>
        <form onSubmit={formik.handleSubmit} className="register-school__form">
          <div className="w-full">
            <InputText
              value={formik.values.schoolName}
              setValue={formik.handleChange}
              id={"schoolName"}
              name={"schoolName"}
              label={"School name"}
              onChange={formik.handleChange}
              placeholder={"Name"}
              isInvalid={formik.errors.schoolName}
              className={"w-full"}
              inputClassName={"w-full"}
              errorText={formik.errors?.schoolName}
            />
          </div>

          {/* School Address input */}
          <div className="w-full">
            <InputText
              value={formik.values.schoolAddress}
              setValue={formik.handleChange}
              id={"schoolAddress"}
              name={"schoolAddress"}
              label={"School address"}
              onChange={formik.handleChange}
              placeholder={"Address"}
              isInvalid={formik.errors.schoolAddress}
              className={"w-full"}
              inputClassName={"w-full"}
              errorText={formik.errors?.schoolAddress}
            />
          </div>

          <div className="w-full">
            <Dropdown
              dropdownOpen={levelDropdownOpen}
              setDropDownOpen={setLevelDropdownOpen}
              options={["Primary", "Secondary", "Tetiary", "Other"]}
              value={formik.values.level}
              onClickFunction={(value) => {
                formik.setFieldValue("level", value);
              }}
              label={"Select Level"}
              isInvalid={formik.errors.level}
              errorText={formik.errors.level}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="standard-btn-1 w-full"
          >
            {isLoading ? "Creating..." : "Create School"}
          </button>

          {/* Password for authentication */}
          <ReactModal
            isOpen={createModalOpen}
            onRequestClose={() => setCreateModalOpen(false)}
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

export default RegsisterSchoolPage;
