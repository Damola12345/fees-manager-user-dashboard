import InfoTable from "../../layouts/details/InfoTable";
import { money, getDate } from "../../GlobalFunctions/GlobalFunctions";
import { useNavigate } from "react-router-dom";
import BigBtn from "../../components/BigBtn/BigBtn";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { StickyHeader } from "../../layouts/details/InfoTable";
import { useState } from "react";
import { DeleteModal } from "../../layouts/details/Modals";

const ClassroomDetails = (props) => {
  const data = props.data;
  //const className = props.className;
  const percentage = "30%";
  const navigate = useNavigate();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const ClassroomOptions = (
    <StickyHeader>
      <div
        onClick={() => {
          navigate(`/students?classroom=${data.name}`);
        }}
      >
        <BigBtn text="View Students" bcolor="#680E4B" grid color="white" />
      </div>
      <div
        onClick={() => {
          navigate(`/payments?classroom=${data.name}`);
        }}
      >
        <BigBtn text="View Payments" bcolor="#680E4B" grid color="white" />
      </div>
      <div
        onClick={() => {
          navigate(`/classrooms/${data.name}/edit`);
        }}
      >
        <BigBtn text="Edit Classroom" bcolor="#680E4B" grid color="white" />
      </div>
    </StickyHeader>
  );

  const options = [
    { "Class Teacher": data.classTeacher },
    { "School Name": data.schoolName },
    { "No of Students": data.noOfStudents },
    { "Class Fees": `NGN ${money(data.classFees)}` },
    { "Total Fees paid": `NGN ${money(data.totalFees)}` },
    { "Total Fees expected": `NGN ${money(0)}` },
    { "Classroom ID": data._id },
    { "Date created": getDate(data.createdAt, true) },
    { "Last updated": getDate(data.updatedAt, true) },
  ];

  return (
    <div className="w-full flex flex-col">
      <InfoTable
        information={options}
        heading={data.name}
        percentage={percentage}
        view="classroom"
        options={ClassroomOptions}
      />

      <div
        className="self-end mt-10"
        onClick={() => {
          setModalIsOpen(!modalIsOpen);
        }}
      >
        <BigBtn
          text="Delete Classroom"
          bcolor="#FF0022"
          color="white"
          icon={faTrashCan}
        />
      </div>

      {
        <DeleteModal
          modalIsOpen={modalIsOpen}
          setModalIsOpen={setModalIsOpen}
          itemType={"classrooms"}
          obj={data}
        />
      }
    </div>
  );
};

export default ClassroomDetails;
