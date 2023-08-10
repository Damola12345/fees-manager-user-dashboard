import { useFormik } from "formik";
import { useNavigate } from "react-router";
import { useState } from "react";
import * as Yup from "yup";
import FileDB from "../../FileDB/methods/DBMethods";
import InputText from "../../components/inputText/InputText";
import ReactModal from "react-modal";

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
    onSubmit: async () => {
      setIsDeleting(true);
      const response = await FileDB.del(itemType, { _id: obj._id });
      if (response === "ok") {
        navigate(`/${itemType}`);
      }
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
      className="absolute bg-white"
    >
      <form className="delete-modal" onSubmit={formik.handleSubmit}>
        <div className="self-center">
          <h2 className="delete-modal__heading">
            warning<span>!</span>
          </h2>
          <p className="delete-modal__text">
            {itemType === "schools" &&
              `You are about to delete all records, including classrooms and students for ${
                obj?.name || obj?.fullname
              }.`}
          </p>
        </div>
        <div className="w-full">
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
          />
          <button
            type="submit"
            className="standard-btn-1 w-full mt-5"
            disabled={isDeleting}
          >
            {isDeleting ? "..." : "Delete"}
          </button>
        </div>
      </form>
    </ReactModal>
  );
};
