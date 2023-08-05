import InfoTable from "../../layouts/details/InfoTable";
import { money, getDate } from "../../GlobalFunctions/GlobalFunctions";
import { useNavigate } from "react-router-dom";
import BigBtn from "../../components/BigBtn/BigBtn";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { StickyHeader } from "../../layouts/details/InfoTable";
import { config } from "../../app.config";
import { DeleteModal } from "../../layouts/details/Modals";
import { useState } from "react";

const SchoolDetails = (props) => {
  const data = props.data;
  const percentage = "20%";
  const navigate = useNavigate();
  const { midPurple } = config.color;
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const SchoolOptions = (
    <StickyHeader>
      <div
        onClick={() => {
          navigate("/students");
        }}
      >
        <BigBtn text="View Students" grid bcolor={midPurple} color="white" />
      </div>
      <div
        onClick={() => {
          navigate("/classrooms");
        }}
      >
        <BigBtn text="View Classrooms" grid bcolor={midPurple} color="white" />
      </div>
      <div
        onClick={() => {
          navigate("/payments");
        }}
      >
        <BigBtn text="View Payments" grid bcolor={midPurple} color="white" />
      </div>
      <div
        onClick={() => {
          navigate(`/schools/${data._id}/edit`);
        }}
      >
        <BigBtn text="Edit School" grid bcolor={midPurple} color="white" />
      </div>
    </StickyHeader>
  );

  const information = [
    { Level: data.level },
    { "No of Students": data.noOfStudents },
    { "No of Classrooms": data.noOfClassrooms },
    { "Total Fees paid": `NGN ${money(data.totalFees)}` },
    { "Total Fees expected": `NGN ${money(0)}` },
    { Address: data.address },
    { "School ID": data._id },
    { "Date created": getDate(data.createdAt, true) },
    { "Last updated": getDate(data.updatedAt, true) },
  ];

  return (
    <div className="w-full flex flex-col">
      <InfoTable
        information={information}
        heading={data.name}
        percentage={percentage}
        view="school"
        options={SchoolOptions}
      />

      <div
        className="self-end mt-10"
        onClick={() => {
          setModalIsOpen(!modalIsOpen);
        }}
      >
        <BigBtn
          text="Delete School"
          bcolor="#FF0022"
          color="white"
          icon={faTrashCan}
        />
      </div>

      {
        <DeleteModal
          modalIsOpen={modalIsOpen}
          setModalIsOpen={setModalIsOpen}
          itemType={"schools"}
          obj={data}
        />
      }
    </div>
  );
};

export default SchoolDetails;
