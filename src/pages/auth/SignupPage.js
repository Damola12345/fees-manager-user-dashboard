import { Loader } from "../../components/Loader/Loader";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import * as Yup from "yup";
import InputText from "../../components/inputText/InputText";

const SignupPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNo: "",
      password1: "",
      password2: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .required("First name is required")
        .min(5, "Minimum of 3 characters")
        .max(20, "Maximum of 20 characters"),
      lastName: Yup.string()
        .required("Last name is required")
        .min(5, "Minimum of 3 characters")
        .max(20, "Maximum of 20 characters"),
      email: Yup.string().required("Email is required"),
      phoneNo: Yup.string()
        .required("Phone number is required")
        .min(10, "Minimum of 10 characters")
        .max(16, "Maximum of 16 characters"),
      password1: Yup.string()
        .required("Password is required")
        .min(5, "Minimum of 3 characters")
        .max(20, "Maximum of 20 characters"),
      password2: Yup.string()
        .oneOf([Yup.ref("password1"), null], "Passwords don't match")
        .required("Verify password"),
    }),
    onSubmit: async (values) => {
      signupUser(values);
    },
  });

  const signupUser = () => {
    setIsLoading(true);
    setTimeout(() => {
      navigate("/login");
    }, [500]);
  };

  const input =
    "h-10 bg-[white] border border-[0.5px] border-[grey] rounded-sm mx-0";

  return (
    <div className="w-full">
      {isLoading ? (
        <Loader loadingText={"..."} />
      ) : (
        <form onSubmit={formik.handleSubmit} className={`signup-form`}>
          <InputText
            value={formik.values.firstName}
            setValue={formik.handleChange}
            id={"firstName"}
            name={"firstName"}
            label={"Enter first name"}
            onChange={formik.handleChange}
            placeholder={"First name"}
            isInvalid={formik.errors.firstName}
            className={"w-full"}
            inputClassName={"w-full"}
            errorText={formik.errors?.firstName}
          />
          <InputText
            value={formik.values.lastName}
            setValue={formik.handleChange}
            id={"lastName"}
            name={"lastName"}
            label={"Enter last name"}
            onChange={formik.handleChange}
            placeholder={"Last name"}
            isInvalid={formik.errors.lastName}
            className={"w-full"}
            inputClassName={"w-full"}
            errorText={formik.errors?.lastName}
          />
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
          />
          <InputText
            value={formik.values.phoneNo}
            setValue={formik.handleChange}
            id={"phoneNo"}
            name={"phoneNo"}
            label={"Enter phone number"}
            onChange={formik.handleChange}
            placeholder={"+234..."}
            isInvalid={formik.errors.phoneNo}
            className={"w-full"}
            inputClassName={"w-full"}
            errorText={formik.errors?.phoneNo}
          />
          <InputText
            value={formik.values.password1}
            setValue={formik.handleChange}
            id={"password1"}
            name={"password1"}
            label={"Enter password"}
            onChange={formik.handleChange}
            placeholder={"Password"}
            isInvalid={formik.errors.password1}
            className={"w-full"}
            inputClassName={"w-full"}
            errorText={formik.errors?.password1}
          />
          <InputText
            value={formik.values.password2}
            setValue={formik.handleChange}
            id={"password2"}
            name={"password2"}
            label={"Verify"}
            onChange={formik.handleChange}
            placeholder={"Password"}
            isInvalid={formik.errors?.password2}
            className={"w-full"}
            inputClassName={"w-full"}
            errorText={formik.errors?.password2}
          />

          <button type="submit" className={`standard-btn-1`}>
            Create account
          </button>
        </form>
      )}
    </div>
  );
};

export default SignupPage;
