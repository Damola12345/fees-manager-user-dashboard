import { ReactComponent as Search } from "../../assets/svg/input-search.svg";
import { ReactComponent as ClearInput } from "../../assets/svg/clear-input.svg";
import { useState } from "react";

const InputText = ({
  ref,
  value,
  setValue,
  errorText,
  onChange,
  onBlur,
  placeholder,
  isInvalid,
  type,
  name,
  label,
  id,
  className,
  inputClassName,
  readOnly,
}) => {
  const [inputFocus, setInputFocus] = useState(false);
  return (
    <div className="standard-input-1">
      {label && (
        <p className={`label ${isInvalid ? "text-red" : "text-[#686A6D]"}`}>
          {label}
        </p>
      )}
      <div
        className={`${
          type === "search" ? "search-box" : "input-box"
        } ${className} ${
          !isInvalid &&
          (inputFocus
            ? "border-[2px] border-midPurple"
            : "border-[1px] border-[#8B8D90]")
        } ${isInvalid && "border-[2px] border-red"}
      ${!isInvalid && "hover:border-midPurple"}`}
      >
        {type === "search" && <Search />}
        <input
          ref={ref}
          name={name}
          id={id}
          type="text"
          placeholder={placeholder}
          className={`input ${inputClassName}`}
          value={value}
          onChange={onChange}
          onFocus={() => setInputFocus(true)}
          onBlur={() => {
            setInputFocus(false);
            onBlur();
          }}
          readOnly={readOnly}
        />
        {value.length > 0 && type === "search" && (
          <button
            onClick={() => {
              setValue("");
            }}
          >
            <ClearInput className="self-end" />
          </button>
        )}
      </div>
      {errorText && (
        <div className="error">
          <div className="err-icon">!</div>
          <p>{errorText}</p>
        </div>
      )}
    </div>
  );
};

export default InputText;
