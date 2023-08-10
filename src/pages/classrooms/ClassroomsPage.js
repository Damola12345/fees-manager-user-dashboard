import { Loader } from "../../components/Loader/Loader";
import { ReactComponent as PlusIcon } from "../../assets/svg/plus.svg";
import { ReactComponent as ClassroomsIcon } from "../../assets/svg/classrooms.svg";
import { useNavigate } from "react-router-dom";
import DisplayButton from "../../components/DisplayCard/DisplayButton";
import DisplayCard from "../../components/DisplayCard/DisplayCard";
import DisplayIcon from "../../components/DisplayCard/DisplayIcon";
import FileDB from "../../FileDB/methods/DBMethods";
import PageHeader from "../../components/pageHeader/PageHeader";
import React, { useEffect, useState } from "react";

const DATABASE = process.env.REACT_APP_DATABASE;

const ClassroomsPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [classrooms, setClassrooms] = useState([]);

  const getClassrooms = async () => {
    // For file database system
    if (DATABASE === "LOCAL_STORAGE") {
      setIsLoading(true);
      const classrooms = await FileDB.get("classrooms", null, "browser");
      setClassrooms(classrooms);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getClassrooms();
  }, []);

  return (
    <section className="school-page">
      <PageHeader
        previousPath={"/"}
        cta={
          <button
            className="standard-btn-1 w-[300px]"
            onClick={() => navigate("/classrooms/register")}
          >
            <PlusIcon />
            Add Classroom
          </button>
        }
      />
      <div className="w-full flex items-center justify-center">
        {isLoading ? (
          <Loader loadingText={"Loading..."} />
        ) : (
          <div className="school-page__con">
            <h2 className="heading">Select classroom</h2>
            <div className="school-list">
              {classrooms.map((cls) => {
                return (
                  <div
                    key={cls._id}
                    onClick={() => {
                      navigate("/classrooms/" + cls._id);
                    }}
                  >
                    <DisplayCard>
                      <DisplayIcon>
                        <ClassroomsIcon />
                      </DisplayIcon>
                      <p className="text-sm">{cls.name}</p>
                      <DisplayButton>View classroom</DisplayButton>
                    </DisplayCard>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ClassroomsPage;
