//import './LoginPage.css';
import { Loader } from "../../components/Loader/Loader";
import { setLocalStorageItems } from "../../utils/index.";
import { useAuth } from "../../contexts/AuthContext";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import FileDB from "../../FileDB/methods/DBMethods";
import InputText from "../../components/inputText/InputText";
import React, { useEffect, useState } from "react";
import ReactModal from "react-modal";

const DATABASE = process.env.REACT_APP_DATABASE;

const LoginPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { setUser, user } = useAuth();
  const [modalIsOpen, setModalIsOpen] = useState(false);
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
      email: DATABASE === "LOCAL_STORAGE" ? "guest.user@test.me" : "",
      password: DATABASE === "LOCAL_STORAGE" ? "guest" : "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
      setModalIsOpen(true);
      //loginUser(values);
    },
  });

  const loginUser = async (values) => {
    if (DATABASE === "LOCAL_STORAGE") {
      setModalIsOpen(false);
      setIsLoading(true);
      const user = await FileDB.get("users", { email: "guest.user@test.me" });
      const schools = await FileDB.get("schools", null, "file");
      const classrooms = await FileDB.get("classrooms", null, "file");
      const students = await FileDB.get("students", null, "file");
      const payments = await FileDB.get("payments", null, "file");

      setLocalStorageItems("user", user[0]);
      setLocalStorageItems("schools", schools);
      setLocalStorageItems("classrooms", classrooms);
      setLocalStorageItems("students", students);
      setLocalStorageItems("payments", payments);
      setLocalStorageItems("currentSchool", "");
      setUser(user[0]);
      new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(navigate("/"));
        }, 500);
      });
    }
  };

  useEffect(() => {
    if (user) navigate("/");
  }, []);

  return (
    <div className="w-full">
      {isLoading ? (
        <Loader loadingText={"..."} />
      ) : (
        <form onSubmit={formik.handleSubmit} className={`login-form`}>
          <InputText
            value={formik.values.email}
            setValue={formik.handleChange}
            id={"email"}
            name={"email"}
            label={"Enter email"}
            onChange={formik.handleChange}
            placeholder={"Email"}
            isInvalid={formik.errors.email}
            className={"w-full"}
            inputClassName={"w-full"}
            errorText={formik.errors?.email}
            readOnly={DATABASE === "LOCAL_STORAGE"}
          />
          <InputText
            value={formik.values.password}
            setValue={formik.handleChange}
            id={"password"}
            name={"password"}
            label={"Enter password"}
            onChange={formik.handleChange}
            placeholder={"Password"}
            isInvalid={formik.errors.password}
            className={"w-full"}
            inputClassName={"w-full"}
            errorText={formik.errors?.password}
            readOnly={DATABASE === "LOCAL_STORAGE"}
          />
          <p
            className="reg-text cursor-pointer"
            onClick={() => navigate("/reset-password")}
          >
            Forgot password?
          </p>

          <button type="submit" className={`standard-btn-1`}>
            {DATABASE === "LOCAL_STORAGE" ? "Login as guest" : "Login"}
          </button>
        </form>
      )}

      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={customStyles}
        ariaHideApp={false}
        shouldCloseOnOverlayClick={true}
        contentLabel="Agreement Modal"
        className="absolute bg-white "
      >
        <form className="login-modal" onSubmit={formik.handleSubmit}>
          <div className="md:mt-10">
            <h2 className="text-3xl font-extrabold">NOTE</h2>
            <p className="text-18">
              Please note that to save costs of deploying a backend service,
              CRUD operations will be caried out using your local browser. All
              data stored in your local storage is cleared when you logout.
            </p>
          </div>
          <div className="w-full grid grid-cols-2 gap-5">
            <button
              type="submit"
              className={`standard-btn-1 white`}
              onClick={() => setModalIsOpen(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`standard-btn-1`}
              onClick={() => loginUser(formik.values)}
            >
              Agree
            </button>
          </div>
        </form>
      </ReactModal>
    </div>
  );
};

export default LoginPage;
