import { useNavigate } from "react-router-dom";
import { ReactComponent as RightArrow } from "../../assets/svg/right-arrow.svg";
const PageHeader = ({ previousPath, cta }) => {
  const navigate = useNavigate();
  return (
    <div className="w-full mb-20 flex items-start justify-between">
      <button onClick={() => navigate(previousPath)}>
        <RightArrow
          className="-rotate-[180deg]"
          width={25}
          height={25}
          fill={"#680e4b"}
        />
      </button>
      <div>{cta}</div>
    </div>
  );
};

export default PageHeader;
