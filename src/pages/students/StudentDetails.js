import InfoTable from "../../layouts/details/InfoTable";
import { money, getDate } from "../../GlobalFunctions/GlobalFunctions";
import { useNavigate } from "react-router-dom";
import BigBtn from "../../components/BigBtn/BigBtn";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { StickyHeader } from "../../layouts/details/InfoTable";
import { config } from "../../app.config";
import { DeleteModal } from "../../layouts/details/Modals";
import { useState } from "react";
import { useDashboard } from "../../contexts/DashboardContext";

const StudentDetails = (props) => {
  const data = props.data;
  //const percentage = "40%";
  //const studentId = props.studentId;
  const navigate = useNavigate();
  const { midPurple } = config.color;
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { currentSchool } = useDashboard();

  const StudentOptions = (
    <StickyHeader>
      <div
        onClick={() => {
          navigate("/payments/create");
        }}
      >
        <BigBtn text="Make Payment" bcolor={midPurple} grid color="white" />
      </div>
      <div
        onClick={() => {
          navigate("/payments");
        }}
      >
        <BigBtn text="View Payments" bcolor={midPurple} grid color="white" />
      </div>
      <div
        onClick={() => {
          navigate(`/students/${data._id}/edit`);
        }}
      >
        <BigBtn text="Edit Student" bcolor={midPurple} grid color="white" />
      </div>
    </StickyHeader>
  );

  const options = [
    { Name: data.fullname },
    { Class: data.classroom },
    { Age: data.age },
    { Sex: data.sex },
    { Discount: data.discount },
    { "Parent phone": data.phoneNo },
    { "Total Fees paid": `NGN ${money(data.totalPaidFees)}` },
    { "Total Fees Expected": `NGN ${money(data.totalFeesExpected)}` },
    { "Student ID": data._id },
    { School: currentSchool?.name },
    { "Date created": getDate(data.createdAt, true) },
    { "Last updated": getDate(data.updatedAt, true) },
  ];

  return (
    <div className="w-full flex flex-col">
      <InfoTable
        information={options}
        heading={data.fullname}
        percentage={`${Math.floor(
          data.totalPaidFees / data.totalFeesExpected
        )} %`}
        view="classroom"
        options={StudentOptions}
      />

      <div
        className="self-end mt-10"
        onClick={() => {
          setModalIsOpen(!modalIsOpen);
        }}
      >
        <BigBtn
          text="Delete Student"
          bcolor="#FF0022"
          color="white"
          icon={faTrashCan}
        />
      </div>

      {
        <DeleteModal
          modalIsOpen={modalIsOpen}
          setModalIsOpen={setModalIsOpen}
          itemType={"students"}
          obj={data}
        />
      }
    </div>
  );
};

export default StudentDetails;
