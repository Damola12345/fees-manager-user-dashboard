import { useNavigate } from "react-router-dom";
import { useState } from "react";
import PageHeader from "../../components/pageHeader/PageHeader";
import { ReactComponent as RefreshIcon } from "../../assets/svg/refresh.svg";
import { useAuth } from "../../contexts/AuthContext";
import { useFormik } from "formik";
import * as Yup from "yup";
import InputText from "../../components/inputText/InputText";
import ReactModal from "react-modal";
import { alertSuccess } from "../../utils/index.";
import FileDB from "../../FileDB/methods/DBMethods";

const DATABASE = process.env.REACT_APP_DATABASE;

const ProfilePage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const { user, setRefreshUser } = useAuth();

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
      firstName: user?.firstname,
      lastName: user?.lastname,
      email: user?.email,
      phone: user?.phone,
      id: user?._id,
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .required("First name is required")
        .min(3, "Minimum of 3 characters")
        .max(20, "Maximum of 20 characters"),
      lastName: Yup.string()
        .required("Last name is required")
        .min(3, "Minimum of 3 characters")
        .max(20, "Maximum of 20 characters"),
      phone: Yup.string()
        .required("Phone number is required")
        .min(10, "Minimum of 10 characters")
        .max(16, "Maximum of 16 characters"),
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
      editProfile();
    },
  });

  const editProfile = async () => {
    if (DATABASE === "LOCAL_STORAGE") {
      setIsLoading(true);
      const response = await FileDB.put(
        "users",
        { _id: user?._id },
        {
          firstname: formik.values.firstName,
          lastname: formik.values.lastName,
          phone: formik.values.phone,
        }
      );
      setRefreshUser(true);
      setIsLoading(false);
      alertSuccess("Profile updated successfully!");
    }
  };

  return (
    <div className="pb-20">
      <PageHeader
        previousPath={-1}
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
      <div className="w-full min-h-[65vh] bg-white rounded-md mt-10">
        <div className="register-school">
          <h1 className="register-school__heading">Your profile</h1>
          <form
            onSubmit={formik.handleSubmit}
            className="register-school__form"
          >
            <div className="w-full flex items-start justify-between">
              <div className="w-[48%]">
                <InputText
                  value={formik.values.email}
                  setValue={formik.handleChange}
                  id={"email"}
                  name={"email"}
                  label={"Email"}
                  onChange={formik.handleChange}
                  placeholder={"Email"}
                  isInvalid={formik.errors.email}
                  className={"w-full"}
                  inputClassName={"w-full"}
                  errorText={formik.errors?.email}
                  readOnly={true}
                />
              </div>
              <div className="w-[48%]">
                <InputText
                  value={formik.values.id}
                  setValue={formik.handleChange}
                  id={"id"}
                  name={"id"}
                  label={"User ID"}
                  onChange={formik.handleChange}
                  placeholder={"Password"}
                  isInvalid={formik.errors.id}
                  className={"w-full"}
                  inputClassName={"w-full"}
                  errorText={formik.errors?.id}
                  readOnly={true}
                />
              </div>
            </div>
            <div className="w-full flex items-start justify-between">
              <div className={"w-[48%]"}>
                <InputText
                  value={formik.values.firstName}
                  setValue={formik.handleChange}
                  id={"firstName"}
                  name={"firstName"}
                  label={"First name"}
                  onChange={formik.handleChange}
                  placeholder={"First name"}
                  isInvalid={formik.errors.firstName}
                  className={"w-full"}
                  inputClassName={"w-full"}
                  errorText={formik.errors?.firstName}
                />
              </div>
              <div className="w-[48%]">
                <InputText
                  value={formik.values.lastName}
                  setValue={formik.handleChange}
                  id={"lastName"}
                  name={"lastName"}
                  label={"Last name"}
                  onChange={formik.handleChange}
                  placeholder={"Last name"}
                  isInvalid={formik.errors.lastName}
                  className={"w-full"}
                  inputClassName={"w-full"}
                  errorText={formik.errors?.lastName}
                />
              </div>
            </div>
            <div className="w-full">
              <InputText
                value={formik.values.phone}
                setValue={formik.handleChange}
                id={"phone"}
                name={"phone"}
                label={"Phone number"}
                onChange={formik.handleChange}
                placeholder={"+234..."}
                isInvalid={formik.errors.phone}
                className={"w-full"}
                inputClassName={"w-full"}
                errorText={formik.errors?.phone}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="standard-btn-1 w-full"
            >
              {isLoading ? "Editing..." : "Edit Profile"}
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
    </div>
  );
};

export default ProfilePage;
