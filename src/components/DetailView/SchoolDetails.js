import InfoTable from "./InfoTable";
import { money, getDate } from "../../GlobalFunctions/GlobalFunctions";
import { useNavigate } from "react-router-dom";
import BigBtn from "../BigBtn/BigBtn";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { StickyHeader } from "./InfoTable";
import { config } from "../../app.config";

const SchoolDetails = (props) => {
  const data = props.data;
  const percentage = '20%';
  const navigate = useNavigate();
  const { midPurple } = config.color;

  const SchoolOptions = (
    <StickyHeader>
      <div onClick={() => {
        navigate("/students");
      }}>
        <BigBtn text="View Students" grid bcolor={midPurple} color='white' />
      </div>
      <div onClick={() => {
        navigate("/classrooms");
      }}>
        <BigBtn text="View Classrooms" grid  bcolor={midPurple} color='white' />
      </div>
      <div onClick={() => {
        navigate("/payments");
      }}>
        <BigBtn text="View Payments" grid bcolor={midPurple} color='white' />
      </div>
      <div onClick={() => {
        navigate(`/schools/${localStorage.currentSchool}/edit`);
      }}>
        <BigBtn text="Edit School" grid bcolor={midPurple} color='white' />
      </div>
    </StickyHeader>
  )

  const del = (
    <div onClick={() => {
      navigate(`/schools/${localStorage.currentSchool}/delete`);
    }}>
      <BigBtn text="Delete School" bcolor="#FF0022" color="white" icon={faTrashCan} />
    </div>
  )

  const information = [
    { 'Level': data.level },
    { 'No of Students': data.noOfStudents },
    { 'No of Classrooms': data.noOfClassrooms },
    { 'Total Fees paid': `NGN ${money(data.totalFees)}` },
    { 'Total Fees expected': `NGN ${money(0)}` },
    { 'Address': data.address },
    { 'School ID': data._id },
    { 'Date created': getDate(data.createdAt, true) },
    { 'Last updated': getDate(data.updatedAt, true) },
  ]

  return (
    <>
      <InfoTable information={information} heading={data.name} percentage={percentage} view='school' options={SchoolOptions} delete={del} />
    </>
  )
}

export default SchoolDetails;
