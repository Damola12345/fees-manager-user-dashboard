import { Loader } from "../../components/Loader/Loader";
import { ReactComponent as PlusIcon } from "../../assets/svg/plus.svg";
import { ReactComponent as SchoolsIcon } from "../../assets/svg/schools.svg";
import { useDashboard } from "../../contexts/DashboardContext";
import { useNavigate } from "react-router-dom";
import DisplayButton from "../../components/DisplayCard/DisplayButton";
import DisplayCard from "../../components/DisplayCard/DisplayCard";
import DisplayIcon from "../../components/DisplayCard/DisplayIcon";
import FileDB from "../../FileDB/methods/DBMethods";
import PageHeader from "../../components/pageHeader/PageHeader";
import React, { useEffect, useState } from "react";

const DATABASE = process.env.REACT_APP_DATABASE;

const SchoolsPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [schools, setSchools] = useState([]);
  const { setCurrentSchool } = useDashboard();

  const getSchools = async () => {
    // For file database system
    if (DATABASE === "LOCAL_STORAGE") {
      setIsLoading(true);
      const schools = await FileDB.get("schools", null, "browser");
      setSchools(schools);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getSchools();
  }, []);

  return (
    <section className="school-page">
      <PageHeader
        previousPath={"/"}
        cta={
          <button
            className="standard-btn-1 w-[300px]"
            onClick={() => navigate("/schools/register")}
          >
            <PlusIcon />
            Register school
          </button>
        }
      />
      <div className="w-full flex items-center justify-center">
        {isLoading ? (
          <Loader loadingText={"Loading..."} />
        ) : schools.length > 0 ? (
          <div className="school-page__con">
            <h2 className="heading">Select school to manage</h2>
            <div className="school-list">
              {schools.map((sch) => {
                return (
                  <div
                    key={sch._id}
                    onClick={() => {
                      setCurrentSchool(sch);
                      navigate("/schools/" + sch._id);
                    }}
                  >
                    <DisplayCard>
                      <DisplayIcon>
                        <SchoolsIcon />
                      </DisplayIcon>
                      <p className="text-sm">{sch.name}</p>
                      <DisplayButton>View School</DisplayButton>
                    </DisplayCard>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="empty-state">
            <h1 className="heading">Please create a school to get started.</h1>
            <button
              className="standard-btn-1 w-full max-w-[350px]"
              onClick={() => navigate("/schools/register")}
            >
              <PlusIcon />
              Register school
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default SchoolsPage;
