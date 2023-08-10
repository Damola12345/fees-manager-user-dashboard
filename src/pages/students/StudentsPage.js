import { Loader } from "../../components/Loader/Loader";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import FileDB from "../../FileDB/methods/DBMethods";
import InputText from "../../components/inputText/InputText";
import PageHeader from "../../components/pageHeader/PageHeader";
import { ReactComponent as PlusIcon } from "../../assets/svg/plus.svg";
import { ReactComponent as FilterIcon } from "../../assets/svg/filter.svg";
import { ReactComponent as CaretDown } from "../../assets/svg/caret-down.svg";
import { useDashboard } from "../../contexts/DashboardContext";

const DATABASE = process.env.REACT_APP_DATABASE;

const StudentsPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [students, setStudents] = useState("");
  const [studentList, setStudentList] = useState("");
  const [classnames, setClassnames] = useState([]);
  const [searchParams] = useSearchParams();
  const [classroom] = useState(searchParams.get("classroom"));
  const [filterActive, setFilterActive] = useState(false);
  const sexes = ["Male", "Female"];
  const [checkedSex, setCheckedSex] = useState(new Array(2).fill(false));
  const [checkedClassrooms, setCheckedClassrooms] = useState([]);
  const [checkedDiscount, setCheckedDiscount] = useState(false);
  const [searchText, setSearchText] = useState("");
  const { currentSchool } = useDashboard();
  const [allFilters, setAllFilters] = useState({
    classrooms: [],
    sex: [],
    search: "",
  });

  const getStudents = async () => {
    if (DATABASE === "LOCAL_STORAGE") {
      setIsLoading(true);
      const students = await FileDB.get(
        "students",
        { schoolId: currentSchool?._id },
        "browser"
      );
      const classrooms = await FileDB.get(
        "classrooms",
        { schoolId: currentSchool?._id },
        "browser"
      );
      const classList = classrooms.sort().map((cls) => {
        return cls.name;
      });
      classList.sort();
      setClassnames(classList);
      setCheckedClassrooms(new Array(classList.length).fill(false));
      setStudents(students);
      setStudentList(students);
      setIsLoading(false);
    }
  };

  const CurrentFilters = () => {
    // ==== Check current filters in place ==== //
    let i = 0;
    let classEmpty = true;
    let updatedStudentList = [];
    let currentStudents = [];
    for (const state of checkedClassrooms) {
      if (state) {
        classEmpty = false;
        let temp = students.filter((stu) => {
          return stu.class === classnames[i];
        });
        updatedStudentList = updatedStudentList.concat(temp);
      }
      i++;
    }
    if (classEmpty) {
      currentStudents = students;
    }
    currentStudents = currentStudents.concat(updatedStudentList);
    return currentStudents;
  };

  const FilterClass = (position) => {
    /* ==== Filter based on classrooms ==== */
    /* Resetting other filters */
    setCheckedSex([false, false]);
    setCheckedDiscount(false);
    /* Done resetting! */
    let updatedClassState = checkedClassrooms;
    updatedClassState = checkedClassrooms.map((cls, index) => {
      return index === position ? !cls : cls;
    });
    setCheckedClassrooms(updatedClassState);

    // Update the students
    let updatedStudentList = [];
    let classEmpty = true;
    let i = 0;
    for (const state of updatedClassState) {
      if (state) {
        classEmpty = false;
        let temp = students.filter((stu) => {
          return stu.classroom === classnames[i];
        });
        updatedStudentList = updatedStudentList.concat(temp);
      }
      i++;
    }
    if (classEmpty) {
      setStudentList(students);
    } else {
      setStudentList(updatedStudentList);
    }
    /* ==== Done updating list based on classrooms ==== */
  };

  const FilterSex = (position) => {
    /* ==== Filter based on selected sex ==== */
    const currentStudents = CurrentFilters();

    // Update true, false values in array
    const updatedSexState = checkedSex.map((sex, index) => {
      return index === position ? !sex : sex;
    });
    setCheckedSex(updatedSexState);

    // Update students based on sex
    let updatedStudentList = [];
    let sexEmpty = true;
    let i = 0;
    for (const state of updatedSexState) {
      if (state) {
        sexEmpty = false;
        let temp = currentStudents.filter((stu) => {
          return stu.sex === sexes[i];
        });
        updatedStudentList = updatedStudentList.concat(temp);
      }
      i++;
    }
    if (sexEmpty) {
      setStudentList(currentStudents);
    } else {
      setStudentList(updatedStudentList);
    }

    /* ==== Done updating based on sex ==== */
  };

  const SearchStudent = (event) => {
    //setSearchText(event.target.value);

    // Reset checkboxes
    setSearchText(event?.target?.value);
    setCheckedDiscount(false);
    setCheckedSex([false, false]);
    const resetClass = new Array(classnames.length).fill(false);
    setCheckedClassrooms(resetClass);
    if (event?.target?.value?.length > 0) {
      const currentStudents = students.filter((stu) => {
        return stu.fullname.toLowerCase().includes(event?.target?.value);
      });
      setStudentList(currentStudents);
    } else {
      setStudentList(students);
    }
  };

  useEffect(() => {
    getStudents();
  }, [currentSchool]);

  useEffect(() => {
    !searchText && SearchStudent({ target: { value: "" } });
  }, [searchText]);

  return (
    <section className="students">
      <PageHeader
        previousPath={"/"}
        cta={
          <button
            className="standard-btn-1 w-[300px]"
            onClick={() => navigate("/students/register")}
          >
            <PlusIcon />
            Add student
          </button>
        }
      />
      {!isLoading && students.length > 0 && (
        <div className="students__header">
          <div className="students__header-filters">
            <InputText
              value={searchText}
              setValue={setSearchText}
              id={"studentSearch"}
              name={"studentSearch"}
              label={""}
              onChange={SearchStudent}
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
                      <div className="flex flex-col">
                        <p className="text-[13px] font-[900] self-start">Sex</p>
                        <div className="flex items-center gap-3 font-[900]">
                          <div className="w-10 gap-1 flex items-center">
                            <label>M</label>
                            <input
                              type="checkbox"
                              id="male"
                              value="male"
                              className="h-4 w-4"
                              checked={checkedSex[0]}
                              onChange={() => FilterSex(0)}
                            />
                          </div>

                          <div className="w-10 gap-1 flex items-center">
                            <label>F</label>
                            <input
                              type="checkbox"
                              id="female"
                              value="female"
                              className="h-4 w-4"
                              checked={checkedSex[1]}
                              onChange={() => FilterSex(1)}
                            />
                          </div>
                        </div>
                      </div>
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
      {!isLoading && students.length === 0 ? (
        <div className="empty-state">
          <h1 className="heading">
            There are no students registered under {currentSchool?.name}.
          </h1>
          <button
            className="standard-btn-1 w-full max-w-[350px]"
            onClick={() => navigate("/students/register")}
          >
            <PlusIcon />
            Add student
          </button>
        </div>
      ) : (
        <div className="students__list">
          {isLoading ? (
            <Loader loadingText={"Loading..."} />
          ) : studentList ? (
            studentList.map((stu) => {
              return (
                <div
                  key={stu._id}
                  onClick={() => {
                    navigate(`/students/${String(stu._id)}`);
                  }}
                >
                  <ScrollOption
                    key={stu._id}
                    one={stu.fullname}
                    two={stu.classroom}
                    three={stu.totalPaidFees}
                    four={stu.discount}
                    five={stu.sex}
                    header={false}
                  />
                </div>
              );
            })
          ) : (
            <div></div>
          )}
        </div>
      )}
      {studentList?.length > 0 && <div className="students__pagination"></div>}
    </section>
  );
};

export const ScrollOption = (props) => {
  const headerStyle = `font-extrabold text-sm flex flex-row text-[grey]`;
  const rowStyle = `overflow-x-ellipsis truncate
		nowrap text-sm h-12 border-b-[0.5px] flex flex-row items-center
		border-opacity-20 border-[grey] cursor-pointer bg-white`;

  return (
    <div className="w-full flex flex-row items-center justify-between bg-white">
      <div className={`w-[5%] pl-5 md:pl-10 bg-[green`}>
        <div
          className={`${
            props.header ? "hidden" : "flex"
          } h-2 w-2 rounded-full bg-midPurple`}
        ></div>
      </div>
      <div
        className={`${
          props.header ? headerStyle : rowStyle
        } w-[65%] md:[30%] pl-5 md:pl-10 bg-[green`}
      >
        <p className="truncate pr-3">{props.one}</p>
      </div>
      <div
        className={`${
          props.header ? headerStyle : rowStyle
        } w-[30%] md:[20%] bg-[grey`}
      >
        <p className="truncate pr-3">{props.two}</p>
      </div>
      <div
        className={`${
          props.header ? headerStyle : rowStyle
        } w-[15%] hidden md:flex bg-[blue`}
      >
        <p className="truncate pr-3">{props.three}</p>
      </div>
      <div
        className={`${
          props.header ? headerStyle : rowStyle
        } w-[15%] hidden lg:flex bg-[pink`}
      >
        <p className="truncate pr-3">{props.four}</p>
      </div>
      <div
        className={`${
          props.header ? headerStyle : rowStyle
        } w-[15%] hidden lg:flex pr-5 md:pr-10 bg-[red`}
      >
        <p className="truncate pr-3">{props.five}</p>
      </div>
    </div>
  );
};

export default StudentsPage;
