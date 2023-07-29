import InfoTable from "./InfoTable";
import { money, getDate } from "../../GlobalFunctions/GlobalFunctions";
import { useNavigate } from "react-router-dom";
import BigBtn from "../BigBtn/BigBtn";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { StickyHeader } from "./InfoTable";

const ClassroomDetails = (props) => {
  const data = props.data;
  //const className = props.className;
  const percentage = '30%';
  const navigate = useNavigate();

  const ClassroomOptions = (
    <StickyHeader>
      <div onClick={() => {
      	navigate(`/students?classroom=${data.name}`);
      }}>
        <BigBtn text="View Students" bcolor='#680E4B' grid color='white' />
      </div>
      <div onClick={() => {
        navigate(`/payments?classroom=${data.name}`);
      }}>
        <BigBtn text="View Payments" bcolor='#680E4B' grid color='white' />
      </div>
      <div onClick={() => {
        navigate(`/classrooms/${data.name}/edit`);
      }}>
        <BigBtn text="Edit Classroom" bcolor='#680E4B' grid color='white' />
      </div>
    </StickyHeader>
  )

  const del = (
    <div onClick={() => {
      navigate(`/classrooms/${data.name}/delete`);
    }}>
      <BigBtn text="Delete Classroom" bcolor="#FF0022" color="white" icon={faTrashCan} />
    </div>
  )

  const options = [
    { 'Class Teacher': data.classTeacher },
    { 'School Name': data.schoolName },
    { 'No of Students': data.noOfStudents },
    { 'Class Fees': data.classFees },
    { 'Total Fees paid': `NGN ${money(data.totalFees)}` },
    { 'Total Fees expected': `NGN ${money(0)}` },
    { 'Classroom ID': data._id },
    { 'Date created': getDate(data.createdAt, true) },
    { 'Last updated': getDate(data.updatedAt, true) },
  ]

  return (
    <>
      <InfoTable information={options} heading={data.name} percentage={percentage} view='classroom' options={ClassroomOptions} delete={del} />
    </>
  )
}

export default ClassroomDetails;
