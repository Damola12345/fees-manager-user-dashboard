import React from "react";

function RowDisplay(props) {
  return(
    <div className={
      `
      px-3 md:py-7 py-4
      ${props.head ? 'bg-gradient-to-r from-[#9d799d] to-[#99BFFF]' : 'bg-[white]'}
      w-full min-h-[70px]
      font-[Inter]
      text-[#3f3f3f]
      ${!props.head ? 'border-[0.5px] border-solid border-t-0 border-[#d8d8d8]' : ''}
      grid
      content-center
      md:flex md:flex-row md:justify-between md:w-full
      `
    }
    >
      {
        !props.head ?
        <>
          <p className="w-[100%] text-justify md:p-0 capitalize text-[#3f3f3f] md:w-[40%] lg:w-[30%] md:ml-[20px] md:text-[#5D5D5D] md:my-auto">
            {props.title}
          </p>
          <div className=" mb-2 p-2 break-all md:p-0 md:m-0 bg-[whitesmoke] rounded-sm text-sm md:text-[1rem] md:w-[60%] lg:w-[70%] md:bg-[white] md:my-auto">
            {props.link ? <a className="link" href={props.description} target="blank">{props.description}</a> : props.description}
          </div>
        </>
        :
        <></>
      }
    </div>
  )
}

export default RowDisplay;
