import { useFormik } from "formik";
import { useState } from "react";
import ReactModal from "react-modal";
import * as Yup from "yup";
import FileDB from "../../FileDB/methods/DBMethods";
import { useNavigate } from "react-router";

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

export const DeleteModal = ({ obj, itemType, modalIsOpen, setModalIsOpen }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      password: "",
    },
    validationSchema: Yup.object({
      password: Yup.string().required("Password is required."),
    }),
    onSubmit: async (values) => {
      setIsDeleting(true);
      const response = await FileDB.del(itemType, { _id: obj._id });
      console.log(response);
      if (response === "ok") {
        navigate(`/${itemType}`);
      }
      //setIsDeleting(true);
      //await createSchool(values);
      //formik.resetForm();
    },
  });

  return (
    <ReactModal
      isOpen={modalIsOpen}
      onRequestClose={() => setModalIsOpen(false)}
      style={customStyles}
      ariaHideApp={false}
      shouldCloseOnOverlayClick={true}
      contentLabel="Terminate school Modal"
      className="absolute bg-white "
      //parentSelector={() => document.querySelector(".block-app")}
    >
      <form
        className="w-full sm:w-[350px] flex flex-col px-5 py-7 gap-5"
        onSubmit={formik.handleSubmit}
      >
        <div className="self-center">
          <label htmlFor="password" className="pl-1 flex flex-row gap-1">
            Password
            <span className={`text-[red]`}>*</span>
          </label>

          <p className="mt-1 text-[14px] text-[red] text-center">
            {itemType === "schools" &&
              `You are about to delete all records, including classrooms and students for ${obj?.name}.`}
          </p>
        </div>
        <div className="w-full">
          <input
            type={"text"}
            onChange={formik.handleChange}
            id="password"
            name="password"
            onBlur={formik.handleBlur}
            className="w-full block h-[50px] px-4 rounded-[8px] text-[16px] border-[1px] border-[#1212124d] outline-none"
          />
          {formik.touched.password && formik.errors.password && (
            <p className="text-sm text-[red]">{formik.errors.password}</p>
          )}
          <button
            type="submit"
            className="w-full bg-midPurple py-2 text-white rounded-[5px] text-sm font-bold mt-5"
            disabled={isDeleting}
          >
            {isDeleting ? "..." : "Delete"}
          </button>
        </div>
      </form>
    </ReactModal>
  );
};
