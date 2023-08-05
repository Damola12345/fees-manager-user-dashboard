import "./AllClassroomsPage.css";
import { Loader } from "../../components/Loader/Loader";
import { useNavigate } from "react-router-dom";
import BigBtn from "../../components/BigBtn/BigBtn";
import { alertMessage } from "../../GlobalFunctions/GlobalFunctions";
import DisplayCard from "../../components/DisplayCard/DisplayCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsersViewfinder } from "@fortawesome/free-solid-svg-icons";
import DisplayButton from "../../components/DisplayCard/DisplayButton";
import DisplayIcon from "../../components/DisplayCard/DisplayIcon";
import PreviousIcon from "../../components/PreviousIcon/PreviousIcon";
import React, { useEffect, useState } from "react";
import { config } from "../../app.config";
import FileDB from "../../FileDB/methods/DBMethods";
import { ReactComponent as Plus } from "../../assets/svg/plus.svg";

const BACKEND_HOST = process.env.REACT_APP_BACKEND_HOST;
const DATABASE = process.env.REACT_APP_DATABASE;

const AllClassroomsPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [classrooms, setClassrooms] = useState([]);
  const { midPurple } = config.color;

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

  /* useEffect(() => {
    DATABASE === 'BACKEND' && fetch(`${BACKEND_HOST}/classrooms?schoolName=${localStorage.currentSchool}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: "include",
    })
    .then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          const classrooms = data.success.map((cls) => {
            return cls.name;
          });
          classrooms.sort();
          setTimeout(() => {
            setContainer(
              classrooms.map((cls) => {
                return (
                  <div key={cls} onClick={() => {
                      navigate(`/classrooms/${cls.replace(new RegExp(' ', 'g'), '_')}`);
                  }}>
                  	<DisplayCard>
                      <DisplayIcon>
                        <FontAwesomeIcon icon={faUsersViewfinder} size='lg' color={midPurple} />
                      </DisplayIcon>
                      <p className='text-sm'>{cls}</p>
                      <DisplayButton >View Classroom</DisplayButton>
                    </DisplayCard>
                  </div>
                )
              })
            )
						setIsLoading(false);
          }, 1000);
        });
      } else if(response.status === 401) {
        navigate('/login');
      } else {
        response.json().then((message) => {
          setTimeout(() => {
            setIsLoading(false);
            alertMessage(message.error, 'block', 'red')
          }, 1000);
        })
      }
    })
    .catch((err) => {
	    setTimeout(() => {
        setIsLoading(false);
        alertMessage('An error occured. Please retry', 'block', 'red');
        console.log(err.message)
      })
    })

    // FOR FILE DATABASE SYSTEM
    DATABASE === 'LOCAL_STORAGE' && (
      FileDB.get('classrooms', {})
        .then((data) => {
          const classrooms = data.map((cls) => {
            return cls.name;
          });
          classrooms.sort();
          setTimeout(() => {
            setContainer(
              classrooms.map((cls) => {
                return (
                  <div key={cls} onClick={() => {
                      navigate(`/classrooms/${cls.replace(new RegExp(' ', 'g'), '_')}`);
                  }}>
                  	<DisplayCard>
                      <DisplayIcon>
                        <FontAwesomeIcon icon={faUsersViewfinder} size='lg' color={midPurple} />
                      </DisplayIcon>
                      <p className='text-sm'>{cls}</p>
                      <DisplayButton >View Classroom</DisplayButton>
                    </DisplayCard>
                  </div>
                )
              })
            )
						setIsLoading(false);
          }, 1000);
        })
    )
  }, []) */

  return (
    <section className="w-full flex flex-col items-center p-10 py-20 md:p-20">
      <div className="w-full flex flex-row justify-between items-center">
        <div className="-mt-20">
          <PreviousIcon path={"/"} />
        </div>
        <div
          className="self-end"
          onClick={() => {
            navigate("/register-classroom");
          }}
        >
          <BigBtn
            text={
              <div className="flex items-center gap-2">
                <Plus /> <p>Add Classroom</p>
              </div>
            }
            bcolor="purple"
            color="white"
            bold
          />
        </div>
      </div>
      <div id="login-signup-msg">
        <h3 id="err-msg"></h3>
      </div>
      <div className="px-20">
        {isLoading ? (
          <Loader loadingText={"Loading..."} />
        ) : (
          <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-x-10 sm:mt-20">
            {classrooms?.map((cls, index) => {
              return (
                <div
                  key={index}
                  onClick={() => {
                    navigate(`/classrooms/${cls._id}`);
                  }}
                >
                  <DisplayCard>
                    <DisplayIcon>
                      <FontAwesomeIcon
                        icon={faUsersViewfinder}
                        size="lg"
                        color={midPurple}
                      />
                    </DisplayIcon>
                    <p className="text-sm">{cls.name}</p>
                    <DisplayButton>View Classroom</DisplayButton>
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

export default AllClassroomsPage;
