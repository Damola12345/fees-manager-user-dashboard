import InputText from "../inputText/InputText";
import { ReactComponent as ArrowDown } from "../../assets/svg/arrow-down.svg";
import { ReactComponent as UserIcon } from "../../assets/svg/user-icon.svg";
import { ReactComponent as LogoutIcon } from "../../assets/svg/logout.svg";
import { ReactComponent as ProfileIcon } from "../../assets/svg/profile.svg";
import { useDashboard } from "../../contexts/DashboardContext";
import { useEffect, useState } from "react";
import { setLocalStorageItems } from "../../utils/index.";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const Header = () => {
  const [schoolDropdown, setSchoolDropdown] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const { searchObjects, schools, currentSchool, setCurrentSchool } =
    useDashboard();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const selectSchool = (e, school) => {
    e.stopPropagation();
    setCurrentSchool(school);
    setLocalStorageItems("currentSchool", school);
    setSchoolDropdown(false);
  };

  const filterObjects = (e) => {
    setSearchText(e.target.value);
    const filterResults = searchObjects?.filter((obj) => {
      return obj?.name?.toLowerCase().includes(e.target.value);
    });
    setSearchResults(filterResults);
  };

  const viewObject = (e, obj) => {
    e.stopPropagation();
    navigate(`/${currentSchool ? obj.path : "schools"}/${obj._id}`);
  };

  useEffect(() => {
    !searchText && setTimeout(() => setSearchResults([]), 500);
  }, [searchText]);

  return (
    <div className="app-header">
      <div className="header-con">
        <div className="header-con__left">
          <div className="dropdown-con">
            <button
              className="button"
              onClick={() => setSchoolDropdown(!schoolDropdown)}
              onBlur={() => setSchoolDropdown(false)}
            >
              <h2>{currentSchool ? currentSchool.name : "Select School"}</h2>
              <ArrowDown className={`${schoolDropdown && "-rotate-[90deg]"}`} />
              {schoolDropdown && (
                <ul className="dropdown-list">
                  {schools?.map((sch, index) => {
                    if (!currentSchool) {
                      return (
                        <li
                          className="dropdown-list__item"
                          key={index}
                          onClick={(e) => selectSchool(e, sch)}
                        >
                          <p className="truncate">{sch.name}</p>
                        </li>
                      );
                    } else if (sch?._id !== currentSchool?._id) {
                      return (
                        <li
                          className="dropdown-list__item"
                          key={index}
                          onClick={(e) => selectSchool(e, sch)}
                        >
                          <p className="truncate">{sch.name}</p>
                        </li>
                      );
                    }
                  })}
                </ul>
              )}
            </button>
          </div>
        </div>
        <div className="header-con__right">
          <div className="relative">
            <InputText
              value={searchText}
              setValue={setSearchText}
              id={"headerSearch"}
              name={"headerSearch"}
              label={""}
              onChange={filterObjects}
              onBlur={() => setSearchText("")}
              placeholder={"Search"}
              isInvalid={false}
              className={"w-[300px]"}
              inputClassName={"w-[300px]"}
              errorText={""}
              type="search"
            />

            {searchResults.length > 0 && (
              <ul className="dropdown-list">
                {(currentSchool ? searchResults : schools)?.map(
                  (obj, index) => {
                    return (
                      <li
                        key={index}
                        className="dropdown-list__item"
                        onClick={(e) => viewObject(e, obj)}
                      >
                        <p className="truncate">{obj.name}</p>
                      </li>
                    );
                  }
                )}
              </ul>
            )}

            {searchText && searchResults.length === 0 && (
              <div className="absolute top-[60px] w-full flex flex-col items-start bg-white rounded-lg shadow-md py-5 max-h-[300px] overflow-scroll">
                <p className="text-18 text-center w-full">No results</p>
              </div>
            )}
          </div>

          <button
            type="button"
            className="profile-icon"
            onBlur={() => setProfileDropdown(false)}
            onClick={() => setProfileDropdown(!profileDropdown)}
          >
            <UserIcon />
            <ArrowDown
              className={`small ${profileDropdown ? "-rotate-[90deg]" : ""}`}
            />

            {profileDropdown && (
              <ul className="dropdown-list2">
                <li
                  className="dropdown-list2__item group"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate("/profile");
                  }}
                >
                  <div className="icon-con rounded-tl-lg">
                    <ProfileIcon height={15} width={15} fill="white" />
                  </div>
                  <div className="text-con group-hover:bg-[whitesmoke] ">
                    Profile
                  </div>
                </li>
                <li
                  className="dropdown-list2__item group"
                  onClick={(e) => {
                    e.stopPropagation();
                    logout();
                  }}
                >
                  <div className="icon-con rounded-bl-lg">
                    <LogoutIcon height={15} width={15} fill="white" />
                  </div>
                  <div className="text-con group-hover:bg-[whitesmoke]">
                    Logout
                  </div>
                </li>
              </ul>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
