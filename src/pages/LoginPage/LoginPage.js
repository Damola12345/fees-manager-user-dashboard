//import './LoginPage.css';
import { alertMessage } from "../../GlobalFunctions/GlobalFunctions";
import { Buffer } from "buffer";
import { faPeopleRoof, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Loader } from "../../components/Loader/Loader";
import { useLocation, useNavigate } from "react-router-dom";
import React, { useState } from "react";

const BACKEND_HOST = process.env.REACT_APP_BACKEND_HOST;

export const LoginSignup = (props) => {
  const url = window.location.href.split("/");
  const pathname = url[url.length - 1];
  const navigate = useNavigate();

  return (
    <div
      className={`w-full h-full p-0 m-0 bg-white flex flex-col lg:flex-row
			transition-all ease-in ease-out duration-300
			px-10 py-10 md:p-20 lg:p-0`}
    >
      <div
        className={`
				relative text-purple 
				lg:bg-purple lg:w-[35%] lg:text-white`}
      >
        <div
          className={`flex flex-col items-center gap-1 w-[150px] lg:mt-20 lg:ml-10`}
        >
          <FontAwesomeIcon
            icon={faPeopleRoof}
            className={`w-[50px] h-[50px] lg:w-[80px] lg:h-[80px]`}
          />
          <h3 className="font-bold">Fees Manager</h3>
        </div>
      </div>
      <div
        className={`w-full bg-white
				flex flex-col items-center`}
      >
        <div className={`w-full mt-20 flex flex-col items-center sm:w-[500px]`}>
          <div
            className={`
						flex flex-row justify-between
						w-full px-10 pb-3 lg:mt-20 lg:w-[65%]`}
          >
            <button type="button" onClick={() => navigate("/login")}>
              <h2>Login</h2>
            </button>
            <button type="button" onClick={() => navigate("/signup")}>
              <h2>Signup</h2>
            </button>
          </div>
          <div className="w-full flex flex-row border-b border-b-[grey]">
            <div
              className={`${
                pathname === "login"
                  ? "border-t border-t-4 border-t-purple"
                  : ""
              }
							w-[50%] transition-all ease-in ease-out duration-300`}
            ></div>
            <div
              className={`${
                pathname === "signup"
                  ? "border-t border-t-4 border-t-purple"
                  : ""
              }
							w-[50%] transition-all ease-in ease-out duration-300`}
            ></div>
          </div>
          <div className="h-7 mb-10">
            <p className="text-md font-light" id="err-msg"></p>
          </div>
          {props.form}
        </div>
      </div>
    </div>
  );
};

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [guest, setGuest] = useState(false);
  const input =
    "h-10 bg-white border border-[0.5px] border-[grey] rounded-sm sm:w-[300px] lg:w-[350px]";

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setTimeout(() => {
      alertMessage("", "block", "");
    }, 0);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setTimeout(() => {
      alertMessage("", "block", "");
    }, 0);
  };

  const loginUser = (event) => {
    setIsLoading(true);
    event ? event.preventDefault() : console.log();
    const credentials = Buffer.from(
      `${guest ? "guest.user@test.me" : email}:${
        guest ? "guestuser" : password
      }`
    ).toString("base64");
    fetch(`${BACKEND_HOST}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        auth: credentials,
      },
      credentials: "include",
      body: JSON.stringify({}),
    })
      .then((response) => {
        //setIsLoading(false);
        if (response.ok) {
          response.json().then((message) => {
            //alertMessage(message.success, 'block', 'green');
            setIsLoading(false);
            localStorage.setItem("currentSchool", "");
            navigate("/");
          });
        } else {
          response.json().then((message) => {
            if (message.error === "Account not verified.") {
              alertMessage(message.error, "block", "red");
              setTimeout(() => {
                setIsLoading(false);
                navigate("/verify-email", { state: { email } });
              }, 2000);
            }
            setTimeout(() => {
              setIsLoading(false);
              alertMessage(message.error, "block", "red");
            }, 1000);
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const guestLogin = () => {
    setGuest(true);
    localStorage.setItem("currentSchool", "");
    navigate("/");
  };

  const loginForm = (
    <div className="w-full">
      <form
        onSubmit={loginUser}
        className={`p-0 m-0
				flex flex-col items-center gap-5`}
      >
        <input
          className={input}
          type="email"
          placeholder="Email"
          autoComplete="off"
          onChange={handleEmailChange}
          minLength={3}
          required
        ></input>
        <div>
          <input
            className={input}
            type="password"
            placeholder="Password"
            autoComplete="off"
            onChange={handlePasswordChange}
            required
          ></input>
          <a href="/reset-password" className="block mt-2 text-sm w-[120px]">
            Forgot password?
          </a>
        </div>
        <button
          type="submit"
          className={`w-[200px] h-10 border-solid border-[0.5px] border-[purple]
					bg-purple text-white rounded-md mt-5 shadow-lg`}
        >
          Login
        </button>
      </form>
      <button
        type="button"
        onClick={() => guestLogin()}
        className={`w-full h-10 border-solid border-[0.5px] border-[purple]
				bg-white text-purple rounded-md mt-20 shadow-lg
				transition-all ease-in ease-out duration-300 hover:scale-[1.02] hover:shadow-xl`}
      >
        Login as guest
      </button>
    </div>
  );
  return (
    <LoginSignup
      form={isLoading ? <Loader loadingText={"Logging in..."} /> : loginForm}
      logoColor={"white"}
      loginstyle={{ borderBottom: "5px solid rgb(82, 26, 82)" }}
    />
  );
};

export default LoginPage;
