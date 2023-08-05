import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmarkCircle,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { Loader } from "../Loader/Loader";
import { useNavigate } from "react-router-dom";
import { HeaderContext } from "../../contexts/HeaderContext";
import { defaultHeaderState } from "../Header/NewHeader";

const BACKEND_HOST = process.env.REACT_APP_BACKEND_HOST;

const SearchBar = (props) => {
  //Searchbar component

  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [inputValue, setinputValue] = useState("");
  const [presentItems, setPresentItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [headerState, setHeaderState] = useContext(HeaderContext);

  useEffect(() => {
    if (!headerState.searchDropdown) {
      setPresentItems([]);
      setinputValue("");
    }
  }, [headerState.searchDropdown]);

  useEffect(() => {
    presentItems.length > 0
      ? setHeaderState({
          ...defaultHeaderState,
          searchActive: true,
          searchDropdown: true,
        })
      : console.log();
  }, [presentItems]);

  useEffect(() => {
    setTimeout(() => {
      if (items.length === 0) {
        fetch(
          `${BACKEND_HOST}/objects?schoolName=${localStorage.currentSchool}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        )
          .then((response) => {
            if (response.ok) {
              response.json().then((data) => {
                setTimeout(() => {
                  const objects = data.success;
                  objects.schools = {
                    name: "Schools",
                    path: "/schools",
                    bold: true,
                  };
                  objects.classrooms = {
                    name: "Classrooms",
                    path: "/classrooms",
                    bold: true,
                  };
                  objects.students = {
                    name: "Students ",
                    path: "/students",
                    bold: true,
                  };
                  objects.payments = {
                    name: "Payments",
                    path: "/payments",
                    bold: true,
                  };

                  const newItems = Object.keys(objects).map((key) => {
                    return objects[key];
                  });
                  setItems(newItems);
                }, 1000);
              });
            } /* else if(response.status === 401) {
					navigate('/login');
				} */
          })
          .catch((err) => {
            console.log(err.message);
          });
      }
    }, 1000);
  }, [inputValue]);

  const handleChange = (event) => {
    setinputValue(event.target.value);
    if (event.target.value.length > 0) {
      setPresentItems(
        items.filter((item) => {
          if (item) {
            return item.name.toLowerCase().includes(event.target.value);
          }
        })
      );
    } else {
      setPresentItems([]);
    }
  };

  return (
    <div tabIndex={1} className="search relative flex flex-col items-center">
      <div className="searchBar text-purple flex flex-row md:justify-between items-center gap-2">
        <FontAwesomeIcon
          icon={headerState.searchActive ? faXmarkCircle : faMagnifyingGlass}
          size="lg"
          onClick={() => {
            setHeaderState({
              ...defaultHeaderState,
              searchActive: !headerState.searchActive,
            });
            setPresentItems([]);
            setinputValue("");
            //console.log(headerState)
          }}
          className={`md:hidden text-midPurple`}
        />
        <input
          type="text"
          placeholder="Search"
          value={inputValue}
          onChange={handleChange}
          className={`
				w-[180px] sm:w-[250px] h-8 lg:w-[300px] border-midPurple
				focus:outline-midPurple
				${headerState.searchActive ? "visible" : "hidden md:block w-[250px]"}
				`}
        />
      </div>
      <div
        className={`
					absolute bg-white w-[250px] h-auto max-h-[250px] md:max-h-[300px] sm:w-[320px]
					mt-[57px] z-[99999] overflow-scroll
					border border-[0.5px] border-[grey] border-opacity-50 rounded-lg
					${presentItems.length > 0 ? "block" : "hidden"}`}
      >
        {!loading ? (
          presentItems.map((item, index) => {
            return (
              <div
                key={item.path}
                onClick={() => {
                  navigate(item.path);
                }}
              >
                {
                  <p
                    key={index}
                    className={`
										text-purple px-3 py-2 truncate overflow-ellipsis
										${item.bold ? "font-bold" : ""}
										cursor-pointer
										transition-all ease-in ease-out duration-300
										hover:scale-[1.02] hover:text-[purple] hover:shadow-md`}
                  >
                    {item.name.replace("(", "[").replace(")", "]")}
                  </p>
                }
              </div>
            );
          })
        ) : (
          <Loader loadingText={""} />
        )}
      </div>
    </div>
  );
};

export default SearchBar;
