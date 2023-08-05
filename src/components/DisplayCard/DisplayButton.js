import { ReactComponent as RightArrow } from "../../assets/svg/right-arrow.svg";

const DisplayButton = ({ children, light, onClick, icon, full, shadow }) => {
  return (
    <button
      className={`
       display-button group
      ${light ? "display-button__light" : "display-button__default"}
      ${full ? "w-full" : "w-[190px]"}
      ${shadow && "shadow-md"}`}
      onClick={onClick}
    >
      {children}
      {icon ? (
        icon
      ) : (
        <RightArrow className="group-hover:translate-x-0.5 transition-all duration-200" />
      )}
    </button>
  );
};

export default DisplayButton;
