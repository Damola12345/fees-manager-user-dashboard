import { alertSuccess } from "../../utils/index.";
import { ReactComponent as RefreshIcon } from "../../assets/svg/refresh.svg";
import { useDashboard } from "../../contexts/DashboardContext";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import Dropdown from "../../components/dropdown/Dropdown";
import FileDB from "../../FileDB/methods/DBMethods";
import InputText from "../../components/inputText/InputText";
import PageHeader from "../../components/pageHeader/PageHeader";
import ReactModal from "react-modal";

const DATABASE = process.env.REACT_APP_DATABASE;

const EditStudent = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [clsDropdownOpen, setClsDropdownOpen] = useState(false);
  const [sexDropdownOpen, setSexDropdownOpen] = useState(false);
  const [classrooms, setClassrooms] = useState([]);
  const [student, setStudent] = useState({});
  const { currentSchool, setCurrentSchool, setReload } = useDashboard();

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
      firstName: student?.fullname?.split(" ")[0],
      lastName: student?.fullname?.split(" ")[1],
      age: student?.age,
      sex: student?.sex,
      phoneNo: student?.phoneNo,
      discount: student?.discount,
      classroom: student?.classroom,
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
      classroom: Yup.string()
        .required("Classroom is required")
        .min(3, "Classroom must be at least 3 characters"),
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
      editStudent();
    },
  });

  const editStudent = async () => {
    if (DATABASE === "LOCAL_STORAGE") {
      setIsLoading(true);
      const response = await FileDB.put(
        "students",
        { _id: student?._id },
        {
          fullname: `${formik.values.firstName} ${formik.values.lastName}`,
          classroom: formik.values.classroom,
          age: formik.values.age,
          sex: formik.values.sex,
          discount: formik.values.discount,
          phoneNo: formik.values.phoneNo,
        }
      );
      setIsLoading(false);
      alertSuccess("Student updated successfully!");
      navigate(window.location.pathname?.split("/edit")[0]);
    }
  };

  const getStudent = async () => {
    if (DATABASE === "LOCAL_STORAGE") {
      setIsLoading(true);
      const filter = { _id: window.location.pathname.split("/")[2] };
      const stuArray = await FileDB.get("students", filter, "browser");
      setStudent(stuArray[0]);
      setIsLoading(false);
    }
  };

  const getClassrooms = async () => {
    if (DATABASE === "LOCAL_STORAGE") {
      setIsLoading(true);
      const filter = { schoolId: currentSchool?._id };
      const allClassrooms = await FileDB.get("classrooms", filter, "browser");
      const clsNames = allClassrooms.map((cls) => {
        return cls?.name;
      });
      setClassrooms(clsNames);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getStudent();
    getClassrooms();
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
        <h1 className="register-school__heading">Edit student</h1>
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
            {isLoading ? "Editing..." : "Edit student"}
          </button>

          {/* Password for authentication */}
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

export default EditStudent;
