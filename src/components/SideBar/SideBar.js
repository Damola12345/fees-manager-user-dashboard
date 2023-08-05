import React, { useContext, useEffect, useState } from "react";
import "./SideBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import IconOption from "../IconOption/IconOption";
import { HeaderContext } from "../../contexts/HeaderContext";
import {
  faBuildingColumns,
  faUsersViewfinder,
  faUsers,
  faMoneyCheck,
} from "@fortawesome/free-solid-svg-icons";
import { defaultHeaderState } from "../Header/NewHeader";

const SideBar = () => {
  //Hamburger sign to view options
  const [headerState, setHeaderState] = useContext(HeaderContext);
  const [hide, setHide] = useState(true);

  useEffect(() => {
    !headerState.sideBar
      ? setTimeout(() => {
          setHide(true);
        }, 300)
      : setTimeout(() => {
          setHide(false);
        }, 0);
  }, [headerState]);

  return (
    <div
      tabIndex={1}
      className="nav relative flex flex-col items-start z-[99999999999]"
    >
      <FontAwesomeIcon
        className="cursor-pointer text-midPurple ml-3 sm:ml-5 md:ml-14"
        icon={faBars}
        size="lg"
        onClick={() => {
          setHeaderState({
            ...defaultHeaderState,
            sideBar: !headerState.sideBar,
          });
        }}
      />
      <aside
        className={`
				absolute bg-[white] h-[calc(100vh-60px)]
				mt-[41px] p-0
				border-r border-r-[grey] border-opacity-50 border-r[0.5px]
				transition-all ease-in ease-out duration-300
				${headerState.sideBar ? "w-[250px] sm:w-[300px] lg:w-[350px] visible" : "w-0"}
				${hide ? "p-0 m-0 border-none" : ""}`}
      >
        <div>
          <IconOption
            iconName={faBuildingColumns}
            option="schools"
            link="/schools"
            sidebar
          />
        </div>
        <div>
          <IconOption
            iconName={faUsersViewfinder}
            option="classrooms"
            link="/classrooms"
            sidebar
          />
        </div>
        <div>
          <IconOption
            iconName={faUsers}
            option="students"
            link="/students"
            sidebar
          />
        </div>
        <div>
          <IconOption
            iconName={faMoneyCheck}
            option="payments"
            link="/payments"
            sidebar
          />
        </div>
        <div>
          <IconOption fill />
        </div>
      </aside>
    </div>
  );
};

export default SideBar;
