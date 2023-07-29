import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const DisplayButton = (props) => {
  return (
    <button className={`
      w-[190px] h-[40px] text-sm rounded-md px-3
      flex flex-row gap-2 items-center justify-center mt-2 group
      ${props.light ? 'bg-white text-[purple] border border-[1px] border-[purple] border-opacity-50' : 'bg-[purple] text-white'}`
  }>
      {props.children}
      <FontAwesomeIcon icon={faArrowRight} className='group-hover:translate-x-0.5 transition-all duration-200' />
    </button>
  )
}

export default DisplayButton;
