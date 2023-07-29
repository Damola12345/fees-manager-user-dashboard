import './RegisterClassroomPage.css';
import { alertMessage } from "../../GlobalFunctions/GlobalFunctions";
import { Loader } from "../../components/Loader/Loader";
import { useNavigate } from 'react-router-dom';
import { useState, useRef } from 'react';
import BigBtn from '../../components/BigBtn/BigBtn';
import PreviousIcon from '../../components/PreviousIcon/PreviousIcon';
import React from 'react';
import SelectionDropdown from '../../components/SelectionDropdown/SelectionDropdown';

const BACKEND_HOST = process.env.REACT_APP_BACKEND_HOST;

const RegisterClassroomPage = () => {
  const navigate = useNavigate();
  const itemsRef = useRef();
  const [isLoading, setIsLoading] = useState(false);

  const createClassroom = (event) => {
    setIsLoading(true);
    event.preventDefault();
    const schoolName = localStorage.currentSchool;
    const classTeacher = event.target.classTeacher.value;
    const fees = event.target.fees.value;
    const password = event.target.password.value;
    const classroomName = itemsRef.current.getItems();
    const clsInfo = JSON.stringify({ classTeacher, schoolName, fees, classroomName: classroomName[0], password });

    alertMessage('', 'none', 'red');
    fetch(`${BACKEND_HOST}/create-classroom`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: "include",
      body: clsInfo
    })
    .then((response) => {
      if (response.ok) { 
        response.json().then((message) => {
          alertMessage(message.success, 'block', 'green');
          setTimeout(() => {
            setIsLoading(false);
            navigate('/classrooms');
          }, 2000);
        });
      } else if(response.status === 401) {
        navigate('/login');
      } else {
        response.json().then((message) => {
          setTimeout(() => {
            setIsLoading(false);
              alertMessage(message.error, 'block', 'red');
            }, 2000);
        })
      }
    })
    .catch((err) => {
      setIsLoading(false);
      alertMessage('An error occured. Please retry', 'block', 'red');
      console.log(err.message)
    });
  }

  const createClsForm = 
    <div id="class-reg-container">
      <form className="class-reg-form" onSubmit={createClassroom}>
        <h2 className="form-title">Add classroom</h2>
        <p className="form-text">Class Teacher</p>
        <input className="input-field" type="text" placeholder="" name="classTeacher" required></input>
        <p className="form-text">Fees per child</p>
        <input className="input-field" type="text" placeholder="" name="fees" required></input>
        <SelectionDropdown dropdownName="classrooms" custom={true} mode='single' ref={itemsRef} />
        <p className="form-text" id="cls-reg-pwd">Admin Password</p>
        <input className="input-field" type="password" placeholder="" name="password" required></input>
        <div id="submit-cls">
          <BigBtn text="Add classroom" bcolor="rgb(60, 7, 60)" color="white" />
        </div>
      </form>
    </div>

  return (
    <div id="class-reg-container">
      <div id='prev-icon'>
        <PreviousIcon path={-1} />
      </div>
      <h1 id="reg-class-title">{localStorage.currentSchool}</h1>
      <div id="login-signup-msg">
        <h3 id="err-msg"></h3>
      </div>
      { isLoading ? <Loader loadingText={"Creating classroom..."} /> : createClsForm}
    </div>
  )
}

export default RegisterClassroomPage;
