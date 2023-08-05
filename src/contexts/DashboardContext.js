import { createContext, useContext, useEffect, useMemo, useState } from "react";
import FileDB from "../FileDB/methods/DBMethods";
import { getLocalStorageItem, setLocalStorageItems } from "../utils/index.";

const DATABASE = process.env.REACT_APP_DATABASE;

const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  const [schools, setSchools] = useState([]);
  const [classrooms, setClassrooms] = useState([]);
  const [students, setStudents] = useState([]);
  const [reload, setReload] = useState({
    schools: true,
    classrooms: true,
    students: true,
  });
  const [currentSchool, setCurrentSchool] = useState(null);
  const [allObjects, setAllObjects] = useState({
    students: [],
    classrooms: [],
    schools: [],
  });
  const [searchObjects, setSearchObjects] = useState([]);
  const [isLoading, setIsloading] = useState(false);

  const setSchool = (school) => {
    setCurrentSchool(school);
    setLocalStorageItems("currentSchool", school);
  };

  useMemo(async () => {
    setIsloading(true);
    if (reload.schools || reload.classrooms || reload.students) {
      let schObjects = allObjects.schools;
      let clsObjects = allObjects.classrooms;
      let stuObjects = allObjects.students;

      if (reload.schools) {
        const newSchools = await FileDB.get("schools", null, "browser");
        setSchools(newSchools);
        schObjects = newSchools.map((sch) => {
          return { name: sch.name, _id: sch._id, path: "schools" };
        });
      }

      if (reload.classrooms) {
        const newClassrooms = await FileDB.get("classrooms", null, "browser");
        setClassrooms(newClassrooms);
        clsObjects = newClassrooms.map((cls) => {
          return { name: cls.name, _id: cls._id, path: "classrooms" };
        });
      }

      if (reload.students) {
        const newStudents = await FileDB.get("students", null, "browser");
        setStudents(newStudents);
        stuObjects = newStudents.map((stu) => {
          return { name: stu.fullname, _id: stu._id, path: "students" };
        });
      }

      setAllObjects({
        schools: schObjects,
        classrooms: clsObjects,
        students: stuObjects,
      });
      setSearchObjects([...schObjects, ...clsObjects, ...stuObjects]);
      setReload({ schools: false, classrooms: false, students: false });
      setIsloading(false);
    }
  }, [reload]);

  useEffect(() => {
    (async () => {
      const currSch = await getLocalStorageItem("currentSchool");
      setCurrentSchool(currSch);
    })();
  }, []);

  return (
    <DashboardContext.Provider
      value={{
        schools,
        classrooms,
        students,
        searchObjects,
        reload,
        setReload,
        currentSchool,
        setCurrentSchool: setSchool,
        isLoading,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => useContext(DashboardContext);
