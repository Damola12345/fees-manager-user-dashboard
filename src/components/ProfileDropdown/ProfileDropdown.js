import {
  faUserShield,
  faArrowRightFromBracket,
  faUserGear,
} from "@fortawesome/free-solid-svg-icons";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import IconOption from "../IconOption/IconOption";
import { HeaderContext } from "../../contexts/HeaderContext";
import { logout } from "../../GlobalFunctions/GlobalFunctions";
import { config } from "../../app.config";
import { defaultHeaderState } from "../Header/NewHeader";
import { useAuth } from "../../contexts/AuthContext";

const ProfileDropdown = () => {
  const navigate = useNavigate();
  const [headerState, setHeaderState] = useContext(HeaderContext);
  const [hide, setHide] = useState(true);
  const { midPurple } = config.color;
  const { logout } = useAuth();

  useEffect(() => {
    if (!headerState.profileDropdown) {
      setTimeout(() => {
        setHide(true);
      }, 300);
    } else {
      setTimeout(() => {
        setHide(false);
      }, 0);
    }
  }, [headerState.profileDropdown]);

  return (
    <div
      tabIndex={0}
      className="dropDown w-[50px] flex flex-col items-end"
      onBlur={() => {
        setHeaderState(defaultHeaderState);
      }}
    >
      <div
        className={`
        h-[40px] w-[40px] rounded-full
        mr-3 sm:mr-5 md:mr-14 border border-[0.5px] border-purple
        flex flex-row items-center justify-center cursor-pointer`}
        onClick={() =>
          setHeaderState({
            ...defaultHeaderState,
            profileDropdown: !headerState.profileDropdown,
          })
        }
      >
        <FontAwesomeIcon icon={faUser} size="xl" color={midPurple} />
      </div>
      <div
        className={`
        absolute bg-white rounded-md w-[180px] md:w-[200px]
        border-[grey]border-[0.5px]border-opacity-50
        mt-[51px] mr-2 delay-200
        transition-all ease-in ease-out duration-300
        ${"headerState.profileDropdown?'h-[137px]':'h-0'"} ${"hide?'border-none':''"}
        ${headerState.profileDropdown ? "flex flex-col" : "hidden"}`}
      >
        <div onClick={() => navigate("/profile")}>
          <IconOption iconName={faUserGear} option="profile" profile first />
        </div>
        <IconOption iconName={faArrowRightFromBracket} option="admin" profile />
        <div onClick={() => logout()}>
          <IconOption iconName={faUserShield} option="logout" profile last />
        </div>
      </div>
    </div>
  );
};

export default ProfileDropdown;
