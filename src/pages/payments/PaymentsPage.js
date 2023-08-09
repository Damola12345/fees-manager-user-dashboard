import { alertMessage } from "../../GlobalFunctions/GlobalFunctions";
import { getDate, money } from "../../GlobalFunctions/GlobalFunctions";
import { Loader } from "../../components/Loader/Loader";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { ScrollOption } from "../students/StudentsPage";
import FileDB from "../../FileDB/methods/DBMethods";
import PageHeader from "../../components/pageHeader/PageHeader";
import InputText from "../../components/inputText/InputText";
import { ReactComponent as PlusIcon } from "../../assets/svg/plus.svg";
import { ReactComponent as FilterIcon } from "../../assets/svg/filter.svg";
import { ReactComponent as CaretDown } from "../../assets/svg/caret-down.svg";

const BACKEND_HOST = process.env.REACT_APP_BACKEND_HOST;
const DATABASE = process.env.REACT_APP_DATABASE;

const PaymentsPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [payments, setPayments] = useState([]);
  const [paymentList, setPaymentList] = useState([]);
  //const [searchText, setSearchText] = useState('');
  const [classnames, setClassnames] = useState([]);
  const [checkedClassrooms, setCheckedClassrooms] = useState([]);
  const [searchParams] = useSearchParams();
  const [classroom] = useState(searchParams.get("classroom"));
  const [filterActive, setFilterActive] = useState(false);
  const [searchText, setSearchText] = useState("");

  const getPayments = async () => {
    if (DATABASE === "LOCAL_STORAGE") {
      setIsLoading(true);
      const payments = await FileDB.get("payments", null, "browser");
      const classrooms = await FileDB.get("classrooms", null, "browser");
      const classList = classrooms.sort().map((cls) => {
        return cls.name;
      });
      classList.sort();
      setClassnames(classList);
      setCheckedClassrooms(new Array(classList.length).fill(false));
      setPayments(payments);
      setPaymentList(payments);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPayments();
  }, []);

  const SearchPayment = (event) => {
    setSearchText(event.target.value);

    // Reset checkboxes
    const resetClass = new Array(classnames.length).fill(false);
    setCheckedClassrooms(resetClass);
    if (event.target.value.length > 0) {
      const currentPayments = payments.filter((payment) => {
        return payment.studentName
          .toLowerCase()
          .includes(event.target.value.toLowerCase());
      });
      setPaymentList(currentPayments);
    } else {
      setPaymentList(payments);
    }
  };

  const FilterClass = (position) => {
    /* ==== Filter based on classrooms ==== */
    /* Resetting other filters */

    /* Done resetting! */
    let updatedClassState = checkedClassrooms;
    updatedClassState = checkedClassrooms.map((cls, index) => {
      return index === position ? !cls : cls;
    });
    setCheckedClassrooms(updatedClassState);

    // Update the payments
    let updatedPaymentList = [];
    let classEmpty = true;
    let i = 0;
    for (const state of updatedClassState) {
      if (state) {
        classEmpty = false;
        let temp = payments.filter((payment) => {
          return payment.studentClass === classnames[i];
        });
        updatedPaymentList = updatedPaymentList.concat(temp);
      }
      i++;
    }
    if (classEmpty) {
      setPaymentList(payments);
    } else {
      setPaymentList(updatedPaymentList);
    }
    /* ==== Done updating list based on classrooms ==== */
  };

  useEffect(() => {
    !searchText && SearchPayment({ target: { value: "" } });
  }, [searchText]);

  return (
    <section className="students">
      <PageHeader
        previousPath={"/"}
        cta={
          <button
            className="standard-btn-1 w-[300px]"
            onClick={() => navigate("/make-payment")}
          >
            <PlusIcon />
            Make payment
          </button>
        }
      />
      {!isLoading && (
        <div className="students__header">
          <div className="students__header-filters">
            <InputText
              value={searchText}
              setValue={setSearchText}
              id={"studentSearch"}
              name={"studentSearch"}
              label={""}
              onChange={SearchPayment}
              placeholder={"Search"}
              isInvalid={false}
              className={"w-[280px]"}
              inputClassName={"w-[280px]"}
              errorText={""}
              type="search"
            />
            <div className="flex gap-10 xl:gap-20 items-start">
              <div className="relative flex flex-col items-end gap-2">
                <button
                  className="flex flex-row items-end relative"
                  onClick={() => setFilterActive(!filterActive)}
                >
                  <FilterIcon fill="#680e4b" width={20} height={20} />
                  <CaretDown
                    fill="#680e4b"
                    width={15}
                    height={15}
                    className={`${filterActive && "-rotate-[90deg]"}`}
                  />
                  {filterActive && (
                    <div
                      className="dropdown"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex flex-col mt-3">
                        <p className="text-[13px] font-[900] self-start">
                          Classrooms
                        </p>
                        {classnames.map((cls, index) => {
                          const checkValue = checkedClassrooms[index];
                          return (
                            <div
                              className="w-full flex flex-row items-center gap-2"
                              key={index}
                            >
                              <input
                                type="checkbox"
                                id={index}
                                value={cls}
                                checked={checkValue}
                                onChange={() =>
                                  FilterClass(classnames.indexOf(cls))
                                }
                                className="h-4 w-4"
                              ></input>
                              <label className="text-sm nowrap font-[900]">
                                {cls}
                              </label>
                              <br />
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </button>
              </div>
            </div>
          </div>
          <ScrollOption
            one={"Name"}
            two={"Class"}
            three={"Fees paid"}
            four={"Discount"}
            five={"Sex"}
            header={true}
          />
        </div>
      )}
      <div className="students__list">
        {isLoading ? (
          <Loader loadingText={"Loading..."} />
        ) : paymentList ? (
          paymentList.map((payment) => {
            return (
              <div
                key={payment._id}
                onClick={() => {
                  navigate(`/payments/${String(payment._id)}`);
                }}
              >
                <ScrollOption
                  key={payment._id}
                  one={payment.studentName}
                  two={payment.depositorName}
                  three={money(payment.amount)}
                  four={payment.purpose}
                  five={getDate(payment.createdAt)}
                  header={false}
                />
              </div>
            );
          })
        ) : (
          <div></div>
        )}
      </div>
      {paymentList?.length > 0 && <div className="students__pagination"></div>}
    </section>
  );
};

export default PaymentsPage;
