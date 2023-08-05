import "./SchoolsPage.css";
import { alertMessage } from "../../GlobalFunctions/GlobalFunctions";
import { Loader } from "../../components/Loader/Loader";
import { useNavigate } from "react-router-dom";
import BigBtn from "../../components/BigBtn/BigBtn";
import DisplayCard from "../../components/DisplayCard/DisplayCard";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPeopleRoof, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import DisplayButton from "../../components/DisplayCard/DisplayButton";
import DisplayIcon from "../../components/DisplayCard/DisplayIcon";
import PreviousIcon from "../../components/PreviousIcon/PreviousIcon";
import { config } from "../../app.config";
import FileDB from "../../FileDB/methods/DBMethods";
import { getLocalStorageItem } from "../../utils/index.";

const BACKEND_HOST = process.env.REACT_APP_BACKEND_HOST;
const DATABASE = process.env.REACT_APP_DATABASE;

const SchoolsPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [schools, setSchools] = useState([]);
  const [container, setContainer] = useState("");
  const { midPurple } = config.color;

  const getSchools = async () => {
    // For file database system
    if (DATABASE === "LOCAL_STORAGE") {
      setIsLoading(true);
      const schools = await getLocalStorageItem("schools");
      setSchools(schools);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    /* DATABASE === "BACKEND" &&
      fetch(`${BACKEND_HOST}/schools`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })
        .then((response) => {
          if (response.ok) {
            response.json().then((data) => {
              const schools = data.success;
              setTimeout(() => {
                setContainer(
                  schools.map((sch) => {
                    return (
                      <div
                        key={sch._id}
                        onClick={() => {
                          localStorage.setItem("currentSchool", sch.name);
                          navigate(
                            "/schools/" +
                              sch.name.replace(new RegExp(" ", "g"), "_")
                          );
                        }}
                      >
                        <DisplayCard>
                          <DisplayIcon>
                            <FontAwesomeIcon
                              icon={faPeopleRoof}
                              size="lg"
                              color={midPurple}
                            />
                          </DisplayIcon>
                          <p className="text-sm">{sch.name}</p>
                          <DisplayButton>View School</DisplayButton>
                        </DisplayCard>
                      </div>
                    );
                  })
                );
                //const containerDisplay = document.getElementById('container');
                //containerDisplay.style.display = 'grid';
                setIsLoading(false);
              }, 1000);
            });
          } else if (response.status === 401) {
            navigate("/login");
          } else {
            response.json().then((message) => {
              setIsLoading(false);
              alertMessage(message.error, "block", "red");
            });
          }
        })
        .catch((err) => {
          setIsLoading(false);
          alertMessage("An error occured. Please retry", "block", "red");
          console.log(err.message);
        });

    // For file database system
    if (DATABASE === "LOCAL_STORAGE") {
      const schools = getLocalStorageItem("schools", {});
      setTimeout(() => {
        setContainer(
          schools.map((sch) => {
            return (
              <div
                key={sch._id}
                onClick={() => {
                  localStorage.setItem("currentSchool", sch.name);
                  navigate("/schools/" + sch._id);
                }}
              >
                <DisplayCard>
                  <DisplayIcon>
                    <FontAwesomeIcon
                      icon={faPeopleRoof}
                      size="lg"
                      color={midPurple}
                    />
                  </DisplayIcon>
                  <p className="text-sm">{sch.name}</p>
                  <DisplayButton>View School</DisplayButton>
                </DisplayCard>
              </div>
            );
          })
        );
        setIsLoading(false);
      }, 500);
    } */
    getSchools();
  }, []);

  return (
    <section className="w-full flex flex-col items-center p-10 py-10 md:px-20">
      <div className="mt-[40px] pl-10 self-start">
        <PreviousIcon path={-1} />
      </div>
      <div className="w-full flex flex-row justify-between items-center bg-[red]"></div>
      <div id="login-signup-msg">
        <h3 id="err-msg"></h3>
      </div>
      <div className="px-20">
        {isLoading ? (
          <Loader loadingText={"Loading..."} />
        ) : (
          <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-x-10 sm:mt-10 max-w-[1000px]">
            <button
              onClick={() => {
                navigate("/register-school");
              }}
              className="w-full md:mx-10 mb-10 bg-[purple] text-white py-2 rounded-[5px]"
            >
              Register school
            </button>
            {schools.map((sch) => {
              return (
                <div
                  key={sch._id}
                  onClick={() => {
                    localStorage.setItem("currentSchool", sch.name);
                    navigate("/schools/" + sch._id);
                  }}
                >
                  <DisplayCard>
                    <DisplayIcon>
                      <FontAwesomeIcon
                        icon={faPeopleRoof}
                        size="lg"
                        color={midPurple}
                      />
                    </DisplayIcon>
                    <p className="text-sm">{sch.name}</p>
                    <DisplayButton>View School</DisplayButton>
                  </DisplayCard>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default SchoolsPage;
