import InfoTable from "./InfoTable";
import { money, getDate } from "../../GlobalFunctions/GlobalFunctions";
import { useNavigate } from "react-router-dom";
import BigBtn from "../BigBtn/BigBtn";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { StickyHeader } from "./InfoTable";
import { config } from "../../app.config";

const StudentDetails = (props) => {
  const data = props.data;
  const percentage = '40%';
  //const studentId = props.studentId;
  const navigate = useNavigate();
  const { midPurple } = config.color;

  const StudentOptions = (
    <StickyHeader>
      <div onClick={() => {
        navigate("/make-payment")
      }}>
        <BigBtn text="Make Payment" bcolor={midPurple} grid color='white' />
      </div>
      <div onClick={() => {
        navigate("/payments");
      }}>
        <BigBtn text="View Payments" bcolor={midPurple} grid color='white' />
      </div>
      <div onClick={() => {
        navigate(`/students/${data._id}/edit`)
    	}}>
        <BigBtn text="Edit Student" bcolor={midPurple} grid color='white' />
      </div>
    </StickyHeader>
  )

  const del = (
    <div onClick={() => {
      navigate(`/students/${data._id}/delete`);
    }}>
      <BigBtn text="Delete Student" bcolor="#FF0022" color="white" icon={faTrashCan} />
    </div>
  )

  const options = [
    { 'Name': data.fullname },
    { 'Class': data.classroom },
    { 'Age': data.age },
    { 'Sex': data.sex },
    { 'Discount': data.discount },
    { 'Parent phone': data.phoneNo },
    { 'Total Fees paid': `NGN ${money(data.totalPaidFees)}` },
    { 'Total Fees Expected': `NGN ${money(data.totalFeesExpected)}` },
    { 'Student ID': data._id },
    { 'School': localStorage.currentSchool },
    { 'Date created': getDate(data.createdAt, true) },
    { 'Last updated': getDate(data.updatedAt, true) },
  ]

  return (
    <>
      <InfoTable information={options} heading={data.fullname} percentage={percentage} view='classroom' options={StudentOptions} delete={del} />
    </>
  )
}

export default StudentDetails;
