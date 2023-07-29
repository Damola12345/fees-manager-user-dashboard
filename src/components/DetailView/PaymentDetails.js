import InfoTable from "./InfoTable";
import { money, getDate } from "../../GlobalFunctions/GlobalFunctions";
import { useNavigate } from "react-router-dom";
import BigBtn from "../BigBtn/BigBtn";
import { faBoxArchive} from "@fortawesome/free-solid-svg-icons";
//import { StickyHeader } from "./InfoTable";

const PaymentDetails = (props) => {
  const data = props.data;
  //const paymentId = props.paymentId;
  const navigate = useNavigate();

  const del = (
    <div onClick={() => {
      navigate(`/payments/${data._id}/archive`);
    }}>
      <BigBtn text="Archive Payment" bcolor="#FF0022" color="white" icon={faBoxArchive} />
    </div>
  )

  const options = [
    { 'Student name': data.studentName },
    { 'Student class': data.studentClass },
    { 'Depositor name': data.depositorName },
    { 'Depositor email': data.email },
    { 'Purpose': data.purpose },
    { 'status': data.status },
    { 'Reference Number': data.referenceNo },
    { 'Transaction Number': data.transactionNo },
    { 'Date': getDate(data.createdAt, true) },
  ]

  return (
    <>
      <InfoTable information={options} heading={data.referenceNo} percentage={`NGN ${money(data.amount)}`} view='classroom' delete={del} />
    </>
  )
}

export default PaymentDetails;
