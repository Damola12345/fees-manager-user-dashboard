import { faPeopleRoof } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router";

const AuthLayout = ({ children }) => {
  const url = window.location.href.split("/");
  const pathname = url[url.length - 1];
  const navigate = useNavigate();

  return (
    <div className={`auth-container`}>
      <div
        className={`
				auth-container__left`}
      >
        <div className={`logo`}>
          <FontAwesomeIcon
            icon={faPeopleRoof}
            className={`w-[50px] h-[50px] lg:w-[80px] lg:h-[80px]`}
          />
          <h2>Fees Manager</h2>
        </div>
      </div>
      <div className={`auth-container__right`}>
        <div className={`auth-container__right-con`}>
          <div className={`header`}>
            <button type="button" onClick={() => navigate("/login")}>
              <h2>Login</h2>
            </button>
            <button type="button" onClick={() => navigate("/signup")}>
              <h2>Signup</h2>
            </button>
          </div>
          <div className="full-border">
            <div
              className={`${pathname === "login" ? "active" : ""} half-border`}
            ></div>
            <div
              className={`${pathname === "signup" ? "active" : ""} half-border`}
            ></div>
          </div>
          <div className="h-7">
            <p className="text-md font-light" id="err-msg"></p>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
