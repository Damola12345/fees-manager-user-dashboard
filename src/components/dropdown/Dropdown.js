import { useState } from "react";
import { ReactComponent as DropDown } from "../../assets/svg/select-arrow.svg";

const Dropdown = ({
  dropdownOpen,
  setDropDownOpen,
  options,
  value,
  setValue,
  onClickFunction,
  iconKey,
  textKey,
  itemPosition,
  label,
  errorText,
  isInvalid,
}) => {
  const [btnFocus, setBtnFocus] = useState(false);

  return (
    <div className="standard-dropdown-1">
      <p className={`label ${isInvalid ? "text-red" : "text-[#686A6D]"}`}>
        {label}
      </p>
      <button
        type="button"
        className={`button ${
          !isInvalid &&
          (btnFocus
            ? "border-[2px] border-midPurple"
            : "border-[1px] border-[#8B8D90]")
        } ${isInvalid && "border-[2px] border-red"}
      ${!isInvalid && "hover:border-midPurple"}`}
        onClick={() => {
          setDropDownOpen(!dropdownOpen);
        }}
        onFocus={() => {
          setBtnFocus(true);
        }}
        onBlur={() => {
          setDropDownOpen(false);
          setBtnFocus(false);
        }}
      >
        <div className="display-text">
          <p className="cut-text">{value ? value : label}</p>
        </div>
        <DropDown />

        {dropdownOpen && (
          <div className="button__options">
            {options?.map((option, index) => {
              if (option.id !== 3) {
                return (
                  <div
                    key={index}
                    type="button"
                    onClick={() => {
                      setValue && setValue(textKey ? option[textKey] : option);
                      onClickFunction && onClickFunction(option);
                      setDropDownOpen(false);
                    }}
                    className={`button__options-item ${
                      itemPosition === "center" && "justify-center"
                    } ${
                      option.disabled
                        ? "cursor-not-allowed opacity-50"
                        : "cursor-pointer"
                    }`}
                  >
                    {iconKey && <div>{option[iconKey]}</div>}
                    <p>{textKey ? option[textKey] : option}</p>
                  </div>
                );
              }
            })}
          </div>
        )}
      </button>

      {isInvalid && errorText && (
        <div className="error">
          <div className="err-icon">!</div>
          <p>{errorText}</p>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
