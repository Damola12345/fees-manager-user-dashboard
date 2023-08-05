import { useState } from "react";
import CircleBar from "../../components/CircleBar/CircleBar";
//import Options from "./AsideOptions";
import RowDisplay from "./RowDisplay";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDownWideShort,
  faArrowUpWideShort,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";

const boxStyle = `absolute w-full bg-gradient-to-rfrom-[#9d799d]to-[#99BFFF]
  flex flex-wrap justify-center gap-y-3 gap-x-5 py-5 px-2 shadow-xl
  mb-1 rounded-lg border border-[0.5px] border-[grey] border-opacity-20
  sticky top-[70px] z-[99999999] bg-white sm:gap-x-7 lg:gap-x-10 2xl:gap-x-[100px]`;

export const StickyHeader = ({ children }) => {
  return <div className={boxStyle}>{children}</div>;
};

const InfoTable = (props) => {
  const { information } = props;
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
    <div
      className={`
      w-full
      flex flex-col gap-20 items-center text-purple
      transition-all ease-in ease-out duration-300`}
    >
      <div className="flex flex-col sm:flex-row items-center gap-5">
        <h1 className="font-bold text-2xl md:text-3xl xl:text-4xl max-w-[250px] md:max-w-[350px] px-5 nowrap truncate text-ellipsis">
          {props.heading}
        </h1>
        <CircleBar percentage={props.percentage} />
      </div>
      <div className="w-full">
        <div className="relative w-full">
          {props.options}
          <button
            onClick={() => handleVisibility()}
            className={`
            sticky top-[inherit] h-[30px] w-[110px] bg-white text-[#680E4B] text-[12px]
            rounded-md mt-10 mb-2 shadow-lg flex flex-row justify-between px-2
            items-center transition-transform duration-200
            z-[9999999]
            border border-[0.5px] border-[grey] border-opacity-50`}
          >
            {show ? "Hide Details" : "Show Details"}
            <FontAwesomeIcon
              icon={show ? faArrowUpWideShort : faArrowDownWideShort}
              size={"lg"}
            />
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
