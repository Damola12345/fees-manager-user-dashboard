import { ReactComponent as HideDetails } from "../../assets/svg/hide-details.svg";
import { ReactComponent as ShowDetails } from "../../assets/svg/show-details.svg";
import { useState } from "react";
import CircleBar from "../../components/CircleBar/CircleBar";
import RowDisplay from "./RowDisplay";

export const StickyHeader = ({ children }) => {
  return <div className={"sticky-header"}>{children}</div>;
};

const InfoTable = ({ information, percentage, heading, options }) => {
  const [show, setShow] = useState(true);
  const [hide, setHide] = useState(false);

  const handleVisibility = () => {
    setShow(!show);
    let delay = 0;
    if (!hide) delay = 50;
    setTimeout(() => {
      setHide(!hide);
    }, delay);
  };

  return (
    <div className={`table`}>
      <div className="table__heading">
        <h1>{heading}</h1>
        <CircleBar percentage={percentage} />
      </div>
      <div className="w-full">
        <div className="relative w-full">
          {options}
          <button onClick={handleVisibility} className={`show-hide-btn`}>
            {show ? "Hide Details" : "Show Details"}
            {show ? <HideDetails /> : <ShowDetails />}
          </button>
          <div
            className={`w-full ${
              show
                ? "border-t border-t-[0.5px] border-t-[grey] border-opacity-20"
                : ""
            }`}
          >
            {information.map((info) => {
              const key = Object.keys(info)[0];
              return (
                <div
                  key={key}
                  className={`
                  ${show ? "h-[81px]" : "h-[0px]"} ${
                    hide ? "invisible" : "visible"
                  }
                  transition-[height] ease-in ease-out duration-300
                  `}
                >
                  <RowDisplay title={key} description={info[key]} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoTable;
