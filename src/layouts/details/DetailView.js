import { Loader } from "../../components/Loader/Loader";
import { useState } from "react";
import ClassroomDetails from "../../pages/classrooms/ClassroomDetails";
import FileDB from "../../FileDB/methods/DBMethods";
import PageHeader from "../../components/pageHeader/PageHeader";
import PaymentDetails from "../../pages/payments/PaymentDetails";
import React, { useEffect } from "react";
import SchoolDetails from "../../pages/schools/SchoolDetails";
import StudentDetails from "../../pages/students/StudentDetails";

const DATABASE = process.env.REACT_APP_DATABASE;

const DetailView = ({ view, queryObj }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [displayItem, setDisplayItem] = useState(null);

  const getDisplayItem = async () => {
    if (DATABASE === "LOCAL_STORAGE") {
      setIsLoading(true);
      const filter = { _id: queryObj.filter };
      const displayArray = await FileDB.get(
        queryObj?.resource,
        filter,
        "browser"
      );
      setDisplayItem(displayArray[0]);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getDisplayItem();
  }, []);

  return (
    <section className={`detail-view`}>
      <PageHeader previousPath={`/${view}s`} />
      <div className="detail-view__display">
        {isLoading ? (
          <Loader loadingText={"Loading..."} />
        ) : (
          <div>
            {view === "school" ? (
              <SchoolDetails data={displayItem} />
            ) : view === "classroom" ? (
              <ClassroomDetails data={displayItem} />
            ) : view === "student" ? (
              <StudentDetails data={displayItem} />
            ) : view === "payment" ? (
              <PaymentDetails data={displayItem} />
            ) : (
              <></>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default DetailView;
