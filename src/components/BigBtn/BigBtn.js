import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./BigBtn.css";

const BigBtn = (props) => {
  return (
    <>
      {props.grid ? (
        <button
          style={{ color: props.color, backgroundColor: props.bcolor }}
          className={`
					min-w-[130px] text-sm h-[35px] bg-white  rounded-md shadow-md
					border-[0.5px] border-opacity-50 border-[${props.bcolor}] grow-1 font-light
					sm:min-w-[160px] xl:min-w-[200px] flex flex-row items-center justify-center gap-3 px-3`}
          disabled={props.disabled}
        >
          {props.text}
          {props.icon ? (
            <FontAwesomeIcon
              icon={props.icon}
              size={"lg"}
              color={props.color}
            />
          ) : (
            <></>
          )}
        </button>
      ) : (
        <button
          type="submit"
          style={{ color: props.color, backgroundColor: props.bcolor }}
          className={`
					min-w-[180px] h-[40px] bg-[white] border-[0.5px] border-solid border-[${
            props.bcolor
          }]
					rounded-md font-extralight flex flex-row items-center justify-center gap-3 px-3
					hover:scale-[1.02] hover:shadow-lg ${
            props.bold ? "font-bold" : "font-extralight"
          }`}
        >
          {props.text}
          {props.icon ? (
            <FontAwesomeIcon
              icon={props.icon}
              size={"lg"}
              color={props.color}
            />
          ) : (
            <></>
          )}
        </button>
      )}
    </>
  );
};

export default BigBtn;
