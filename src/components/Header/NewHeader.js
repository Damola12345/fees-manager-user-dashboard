import React, { useContext } from "react";
import "./Header.css";
import SearchBar from "../SearchBar/SearchBar";
import SideBar from "../SideBar/SideBar";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPeopleRoof } from "@fortawesome/free-solid-svg-icons";
import { HeaderContext } from "../../contexts/HeaderContext";
import ProfileDropdown from "../ProfileDropdown/ProfileDropdown";
import GlobalContext from "../../contexts/GlobalContext";

export const defaultHeaderState = {
  sideBar: false,
  searchDropdown: false,
  profileDropdown: false,
  seacrhActive: false,
};

const NewHeader = () => {
  const [currentSch, setCurrentSch] = useState(
    localStorage.getItem("currentSchool")
  );
  const [pageActive, setPageActive] = useContext(GlobalContext);
  const [headerState, setHeaderState] = useContext(HeaderContext);

  useEffect(() => {
    headerState.sideBar ||
    headerState.searchDropdown ||
    headerState.profileDropdown
      ? setPageActive(false)
      : setPageActive(true);
  }, [headerState]);

  return (
    <header
      className={`fixed w-full h-[60px] shadow-md z-[99999999999]
      flex flex-row items-center bg-white
      justify-between`}
    >
      <SideBar />
      <a
        href="/"
        className={`${
          headerState.searchActive ? "hidden" : "block"
        } md:block text-midPurple`}
      >
        <FontAwesomeIcon icon={faPeopleRoof} size="2x" />
      </a>
      <SearchBar header />
      <ProfileDropdown />
    </header>
  );
};

export default NewHeader;
