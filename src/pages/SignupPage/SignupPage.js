import './SignupPage.css';
import { alertMessage } from "../../GlobalFunctions/GlobalFunctions";
import { Loader } from "../../components/Loader/Loader";
import { LoginSignup } from "../LoginPage/LoginPage";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import React, { useEffect } from "react";

const BACKEND_HOST = process.env.REACT_APP_BACKEND_HOST;

const SignupPage = () => {
  const navigate = useNavigate();
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleFnameChange = (event) => {
    setFirstname(event.target.value);
    alertMessage('', 'none', '');
  }
  const handleLnameChange = (event) => {
    setLastname(event.target.value);
    alertMessage('', 'none', '');
  }
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    alertMessage('', 'none', '');
  }
  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
    alertMessage('', 'none', '');
  }
  const handlePassword1Change = (event) => {
    setPassword1(event.target.value);
    alertMessage('', 'none', '');
  }
  const handlePassword2Change = (event) => {
    setPassword2(event.target.value);
    alertMessage('', 'none', '');
  }

  useEffect(() => {
    if (!isLoading) {
      const color = document.getElementById("Verify-password");
      password2 === password1 ? color.style.borderColor = 'green' : color.style.borderColor = 'red';
      !password2 ? color.style.borderColor = 'grey' : console.log();
    }
  })

  const SignupUser = (event) => {
    setIsLoading(true);
    event.preventDefault()
    if (password1 === password2) {
      const userInfo = { firstname, lastname, email, phone, password: password2 }
      fetch(`${BACKEND_HOST}/signup`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userInfo)
      })
      .then((response) => {
        if (response.ok) { 
          response.json().then((message) => {
            alertMessage(message.success, 'block', 'green');
            setIsLoading(false);
            navigate('/verify-email', { state: { email } });
          });
        }
        response.json().then((message) => {
          setIsLoading(false);
          alertMessage(message.error, 'block', 'red');
        })
      })
      .catch((err) => {
        setIsLoading(false);
        alertMessage('An error occured. Please retry', 'block', 'red');
        console.log(err.message)
      });
    } else {
      setIsLoading(false);
      alertMessage('Passwords don\'t match', 'block', 'red');
    }
  }

  const input = 'h-10 bg-[white] border border-[0.5px] border-[grey] rounded-sm mx-0';

  const signupForm = 
    <form onSubmit={SignupUser} className={
			`p-0 m-0
			flex flex-col items-center gap-3`}
    >
      <input className={input} type="text" placeholder="First name" value={firstname} onChange={handleFnameChange} minLength={2} required></input>
      <input className={input} type="text" placeholder="Last name" value={lastname} onChange={handleLnameChange} minLength={2} required></input>
      <input className={input} type="email" placeholder="Email" value={email} onChange={handleEmailChange} minLength={3} required></input>
      <input className={input} type="number" placeholder="Phone number" value={phone} onChange={handlePhoneChange} minLength={11} required></input>
      <input className={input} type="password" placeholder="Create password" value={password1} onChange={handlePassword1Change} minLength={5} required></input>
      <input className={input} id="Verify-password" type="password" placeholder="Verify password" value={password2} onChange={handlePassword2Change} required></input>
      <button type="submit" className={
				`w-[200px] h-10 border-solid border-[0.5px] border-[purple]
				bg-purple text-white rounded-md mt-7`}
			>
				Signup
			</button>
		</form>
  return (
    <LoginSignup form={isLoading ? <Loader loadingText={"Creating your account..."} /> : signupForm} logoColor={"white"} signupstyle={{borderBottom: "5px solid rgb(82, 26, 82)"}} />
  )
}

export default SignupPage;
