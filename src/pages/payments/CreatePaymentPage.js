import { alertSuccess } from "../../utils/index.";
import { money } from "../../GlobalFunctions/GlobalFunctions";
import { PaystackButton } from "react-paystack";
import { ReactComponent as DropDown } from "../../assets/svg/select-arrow.svg";
import { useDashboard } from "../../contexts/DashboardContext";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import FileDB from "../../FileDB/methods/DBMethods";
import InputText from "../../components/inputText/InputText";
import PageHeader from "../../components/pageHeader/PageHeader";
import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";
import RowDisplay from "../../layouts/details/RowDisplay";

const DATABASE = process.env.REACT_APP_DATABASE;
const PAYSTACK_API_KEY = process.env.REACT_APP_PAYSTACK_API_KEY;

const CreatePaymentPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [students, setStudents] = useState("");
  const [studentList, setStudentList] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [stuDropdownOpen, setStuDropdownOpen] = useState(false);
  const [btnFocus, setBtnFocus] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const { currentSchool } = useDashboard();

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
      email: "",
      depositorName: "",
      amount: 0,
      purpose: "",
      studentName: "",
      studentId: 0,
      studentClass: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Email is required"),
      depositorName: Yup.string()
        .required("Depositor name is required")
        .min(5, "Name must be at least 3 characters")
        .max(100, "Name must not exceed 100 characters"),
      amount: Yup.number()
        .required("Amount is required")
        .min(1000, "Minimum of 1000"),
      purpose: Yup.string()
        .required("Purpose is required")
        .min(10, "Name must be at least 10 characters")
        .max(100, "Name must not exceed 100 characters"),
      studentName: Yup.string().required("Student name is required"),
      studentId: Yup.string().required(),
      studentClass: Yup.string().required("Classroom is required"),
    }),
    onSubmit: async (values) => {
      setIsLoading(true);
      setModalOpen(true);
      //formik.resetForm();
    },
  });

  const getStudents = async () => {
    if (DATABASE === "LOCAL_STORAGE") {
      setIsLoading(true);
      const students = await FileDB.get("students", null, "browser");
      setStudents(students);
      setStudentList(students);
      setIsLoading(false);
    }
  };

  const SearchStudent = (event) => {
    setSearchText(event.target.value);
    if (event.target.value.length > 0) {
      setStuDropdownOpen(true);
      const currentStudents = students.filter((stu) => {
        const name_id = stu.fullname + " - " + stu._id;
        return name_id.toLowerCase().includes(event.target.value);
      });
      setStudentList(currentStudents);
    } else {
      setStuDropdownOpen(false);
      setStudentList(students);
    }
  };

  const savePayment = async (paystackResponse) => {
    const paymentObj = {
      depositorName: formik.values.depositorName,
      email: formik.values.email,
      studentName: formik.values.studentName,
      studentId: formik.values.studentId,
      studentClass: formik.values.studentClass,
      amount: formik.values.amount,
      purpose: formik.values.purpose,
      referenceNo: paystackResponse?.reference,
      status: paystackResponse?.status,
      paymentMessage: paystackResponse?.message,
      transactionNo: paystackResponse?.transaction,
    };

    if (DATABASE === "LOCAL_STORAGE") {
      setIsLoading(true);
      setModalOpen(false);
      const response = await FileDB.post("payments", paymentObj);
      if (response === "ok") {
        ResetPayment();
        setIsLoading(false);
        alertSuccess("Payment successfull!");
        navigate("/payments");
      }
    }
  };

  const SelectStudent = (stu) => {
    formik.setFieldValue("studentName", stu.fullname);
    formik.setFieldValue("studentId", stu._id);
    formik.setFieldValue("studentClass", stu.classroom);
  };

  const ResetPayment = () => {
    setModalOpen(false);
    setIsLoading(false);
    formik.resetForm();
  };

  const componentProps = {
    email: formik.values.email,
    amount: formik.values.amount * 100,
    metadata: {
      depositorName: formik.values.depositorName,
      studentName: formik.values.studentName,
      studentId: formik.values.studentId,
    },
    publicKey: PAYSTACK_API_KEY,
    text: "Pay Fees",
    onSuccess: (res) => {
      alert("Payment successful! Please check for email for a receipt");
      savePayment(res);
    },
    onClose: () => {
      setIsLoading(false);
      setModalOpen(false);
      alert(
        "Your payment will not be completed. Are you sure you want to exit?"
      );
    },
  };

  useEffect(() => {
    getStudents();
  }, []);

  return (
    <div className="pb-20">
      <PageHeader previousPath={"/students"} />
      <div className="register-student">
        <h1 className="register-student__heading">Make Payment</h1>
        <h2 className="register-classroom__subheading">
          {currentSchool?.name}
        </h2>
        <form
          className="register-classroom__form"
          onSubmit={formik.handleSubmit}
        >
          {/* Depositor name input */}
          <div className="w-full">
            <InputText
              value={formik.values.depositorName}
              setValue={formik.handleChange}
              id={"depositorName"}
              name={"depositorName"}
              label={"Depositor name"}
              onChange={formik.handleChange}
              placeholder={"Name"}
              isInvalid={formik.errors.depositorName}
              className={"w-full"}
              inputClassName={"w-full"}
              errorText={formik.errors?.depositorName}
            />
          </div>

          {/* Depositor email input */}
          <div className="w-full">
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
            />
          </div>

          {/* Amount input */}
          <div className="w-full">
            <InputText
              value={formik.values.amount}
              setValue={formik.handleChange}
              id={"amount"}
              name={"amount"}
              label={"Amount"}
              onChange={formik.handleChange}
              placeholder={"Amount"}
              isInvalid={formik.errors.amount}
              className={"w-full"}
              inputClassName={"w-full"}
              errorText={formik.errors?.amount}
              inputType={"number"}
            />
          </div>

          {/* Purpose/Description input */}
          <div className="w-full">
            <InputText
              value={formik.values.purpose}
              setValue={formik.handleChange}
              id={"purpose"}
              name={"purpose"}
              label={"Purpose / Description"}
              onChange={formik.handleChange}
              placeholder={"Purpose"}
              isInvalid={formik.errors.purpose}
              className={"w-full"}
              inputClassName={"w-full"}
              errorText={formik.errors?.purpose}
            />
          </div>

          <div className="w-full flex flex-col items-start gap-2">
            <div className={`w-full flex-grow`}>
              <div className="standard-dropdown-1">
                <p
                  className={`label ${
                    formik.errors.studentName ? "text-red" : "text-[#686A6D]"
                  }`}
                >
                  Select student
                </p>
                <button
                  type="button"
                  className={`button ${
                    !formik.errors.studentName &&
                    (btnFocus
                      ? "border-[2px] border-midPurple"
                      : "border-[1px] border-[#8B8D90]")
                  } ${formik.errors.studentName && "border-[2px] border-red"}
                  ${!formik.errors.studentName && "hover:border-midPurple"}`}
                  onClick={() => {
                    setStuDropdownOpen(!stuDropdownOpen);
                  }}
                  onFocus={() => {
                    setBtnFocus(true);
                  }}
                  onBlur={() => {
                    setBtnFocus(false);
                  }}
                >
                  <div className="display-text">
                    <p className="cut-text">
                      {formik.values.studentName
                        ? `${formik.values.studentName} - (${formik.values.studentClass})`
                        : "Select student"}
                    </p>
                  </div>
                  <DropDown />

                  {stuDropdownOpen && (
                    <ul
                      className="w-full absolute left-0 bottom-[70px] bg-white py-5 px-4 text-16 text-black font-extrabold
                    flex flex-col justify-center overflow-scroll shadow-md max-h-[300px] border
                    border-grey border-opacity-40 rounded-md"
                    >
                      {studentList?.map((stu, index) => {
                        return (
                          <li
                            key={index}
                            type="button"
                            onClick={() => {
                              SelectStudent(stu);
                            }}
                            className={`button__options-item ${
                              index === 0 && "mt-5"
                            } hover:bg-[whitesmoke] px-4`}
                          >
                            {`${stu.fullname} - (${stu.classroom})`}
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </button>

                {formik.errors.studentName && (
                  <div className="error">
                    <div className="err-icon">!</div>
                    <p>{formik.errors.studentName}</p>
                  </div>
                )}
              </div>
            </div>
            <div className={`${formik.errors.studentName && "mb-0"}`}>
              <InputText
                value={searchText}
                setValue={setSearchText}
                id={"search"}
                name={"search"}
                label={""}
                onChange={SearchStudent}
                onBlur={() => setSearchText("")}
                placeholder={"Search"}
                isInvalid={false}
                className={"w-full"}
                inputClassName={"w-full"}
                errorText={""}
                type="search"
              />
            </div>
          </div>

          <button
            onClick={() => console.log(formik.errors)}
            type="submit"
            className={`
              ${isLoading ? "cursor-wait opacity-70" : "cursor-pointer"}
              w-full bg-midPurple text-white py-3 rounded-lg mt-10
              `}
          >
            {isLoading ? "..." : "Make payment"}
          </button>

          <p className="text-sm text-grey mt-6 max-w-[400px] text-center">
            All payments are processed using{" "}
            <a href="https://paystack.com/" target={"blank"}>
              Paystack
            </a>{" "}
            click "Pay Fees" to continue.
          </p>
        </form>

        <ReactModal
          isOpen={modalOpen}
          onRequestClose={() => setModalOpen(false)}
          style={customStyles}
          ariaHideApp={false}
          shouldCloseOnOverlayClick={true}
          contentLabel="Create classroom Modal"
          className="w-[90%] md:w-[60%] xl:w-[50%] h-[60vh] max-h-[500px] absolute bg-white"
        >
          <form className="bg-white flex flex-col items-center rounded-lg px-5 md:px-8 py-10">
            <div className="self-center">
              <p className="text-16 font-extrabold uppercase">
                Please confirm student information before proceeding.
              </p>
            </div>
            <div className="w-full max-h-[300px] overflow-scroll mt-5 border border-grey border-opacity-50 rounded-md">
              <RowDisplay
                title={"Student name"}
                description={formik.values.studentName}
              />
              <RowDisplay
                title={"Student Class"}
                description={formik.values.studentClass}
              />
              <RowDisplay
                title={"Student Id"}
                description={formik.values.studentId}
              />
              <RowDisplay
                title={"Amount"}
                description={`NGN ${money(formik.values.amount)}`}
              />
              <RowDisplay
                title={"Depositor name"}
                description={formik.values.depositorName}
              />
              <RowDisplay
                title={"Depositor email"}
                description={formik.values.email}
              />
              <RowDisplay
                title={"Purpose"}
                description={formik.values.purpose}
              />
            </div>

            <div className="w-full flex items-center justify-between mt-8">
              <button
                onClick={ResetPayment}
                type="button"
                className="standard-btn-1 white w-[48%]"
              >
                Cancel
              </button>
              <div
                onClick={(e) => {
                  e.preventDefault();
                  setIsLoading(true);
                }}
                className="standard-btn-1 w-[48%]"
              >
                <PaystackButton className="w-full h-full" {...componentProps} />
              </div>
            </div>
          </form>
        </ReactModal>
      </div>
    </div>
  );
};

export default CreatePaymentPage;
