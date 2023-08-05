import InfoTable from "../../layouts/details/InfoTable";
import { money, getDate } from "../../GlobalFunctions/GlobalFunctions";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
//import { StickyHeader } from "./InfoTable";

const PaymentDetails = (props) => {
  const data = props.data;
  //const paymentId = props.paymentId;
  const navigate = useNavigate();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const options = [
    { "Student name": data.studentName },
    { "Student class": data.studentClass },
    { "Depositor name": data.depositorName },
    { "Depositor email": data.email },
    { Purpose: data.purpose },
    { status: data.status },
    { "Reference Number": data.referenceNo },
    { "Transaction Number": data.transactionNo },
    { Date: getDate(data.createdAt, true) },
  ];

  return (
    <div className="w-full flex flex-col">
      <InfoTable
        information={options}
        heading={data.referenceNo}
        percentage={`NGN ${money(data.amount)}`}
        view="classroom"
      />

      {/* <div
        className="self-end mt-10"
        onClick={() => {
          navigate(`/payments/${data._id}/archive`);
        }}
      >
        <BigBtn
          text="Archive Payment"
          bcolor="#FF0022"
          color="white"
          icon={faBoxArchive}
        />
      </div> */}

      {/* {
        <DeleteModal
          modalIsOpen={modalIsOpen}
          setModalIsOpen={setModalIsOpen}
          itemType={"schools"}
          obj={data}
        />
      } */}
    </div>
  );
};

export default PaymentDetails;
