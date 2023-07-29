import './RegisterStudentPage.css';
import { alertMessage } from '../../GlobalFunctions/GlobalFunctions';
import { Loader } from '../../components/Loader/Loader';
import { useNavigate } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';
import BigBtn from '../../components/BigBtn/BigBtn';
import PreviousIcon from '../../components/PreviousIcon/PreviousIcon';
import React from 'react';
import SelectionDropdown from '../../components/SelectionDropdown/SelectionDropdown';

const BACKEND_HOST = process.env.REACT_APP_BACKEND_HOST;

const RegisterStudentPage = () => {
  const navigate = useNavigate();
  const itemsRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  //const [sex, setSex] = useState(null);

  const [classrooms, setClassrooms] = useState([]);

  useEffect(() => {
    alertMessage('', 'none', 'green');
    fetch(`${BACKEND_HOST}/classrooms?schoolName=${localStorage.currentSchool}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: "include",
    })
    .then((response) => {
      if (response.ok) { 
        response.json().then((data) => {
          const classList = data.success.sort().map((cls) => {
              return cls.name;
          })
          classList.sort();
          setClassrooms(classList)
        });
      } else if(response.status === 401) {
        navigate('/login');
      } else {
        response.json().then((message) => {
          ///setIsLoading(false);
          //alertMessage(message.error, 'block', 'red');
        })
      }
    })
    .catch((err) => {
      //setIsLoading(false);
      //alertMessage('An error occured. Please retry', 'block', 'red');
      console.log(err.message)
    });
  }, []);

  const createStudent = (event) => {
    setIsLoading(true);
    event.preventDefault();

    const firstname = event.target.firstname.value;
    const lastname = event.target.lastname.value;
    const age = event.target.age.value;
    const sex = event.target.sex.value;
    const phoneNo = event.target.phoneNo.value;
    const discount = event.target.discount.value || 0;
    const password = event.target.password.value;
    const classroom = itemsRef.current.getItems();
    const schoolName = localStorage.currentSchool;
    const stuInfo = JSON.stringify({ firstname, lastname, age, sex, phoneNo, discount, password, classroom: classroom[0], schoolName });

    alertMessage('', 'none', 'red');
    fetch(`${BACKEND_HOST}/register-student`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: "include",
      body: stuInfo
    })
    .then((response) => {
      if (response.ok) { 
        response.json().then((message) => {
          alertMessage(message.success, 'block', 'green');
          setTimeout(() => {
            setIsLoading(false);
            navigate('/students');
          }, 2000);
        });
      } else if(response.status === 401) {
        navigate('/login');
      } else {
        response.json().then((message) => {
          console.log('inside')
          setIsLoading(false);
          alertMessage(message.error, 'block', 'red');
        })
      }
    })
    .catch((err) => {
      setIsLoading(false);
      alertMessage('An error occured. Please retry', 'block', 'red');
      console.log(err.message)
    });
  }

  // Get a list of classrooms

  const createStuForm = <form className="student-reg-form" onSubmit={createStudent}>
    <h2 className="form-title">Register student</h2>
    <p className="form-text">First name</p>
    <input className="input-field" type="text" placeholder="" name="firstname" required></input>
    <p className="form-text">Last name (surname)</p>
    <input className="input-field" type="text" placeholder="" name="lastname" required></input>
    <p className="form-text">Age</p>
    <input className="input-field" type="text" placeholder="" name="age" required></input>
    <p className="form-text">Sex</p>
    <select className="sex-dropdown" required name='sex'>
      <option value={''}>Select sex</option>

      <option value="Male">Male</option>

      <option value="Female">Female</option>
    </select>
    <p className="form-text">Parent's phone no.</p>
    <input className="input-field" type="text" placeholder="" name="phoneNo" required></input>
    <p className="form-text">Applied discount% (optional)</p>
    <input className="input-field" type="number" placeholder="" name="discount" ></input>
    <SelectionDropdown dropdownName="student classroom" mode="single" ref={itemsRef} items={classrooms}/>
    <p style={{color: "grey"}}>If you don't see the desired classroom from the dropdown, please proceed to create a new classroom before registering the student</p>
    <div id="go-to-create" onClick={() => {
      navigate("/register-classroom");
    }}>
      <BigBtn text="create new classroom"/>
    </div>
    <p className="form-text" id="stu-reg-pwd">Admin Password</p>
    <input className="input-field" type="password" placeholder="" name="password" required></input>
    <div id="submit-stu">
      <BigBtn text="Register" bcolor="rgb(60, 7, 60)" color="white" />
    </div>
  </form>

  return (
    <div id="student-reg-container">
      <div id='prev-icon'>
        <PreviousIcon path={-1} />
      </div>
      <h1 id="reg-student-title">{localStorage.currentSchool}</h1>
      <div id="login-signup-msg">
        <h3 id="err-msg"></h3>
      </div>
      { isLoading ? <Loader loadingText={"Adding student to records..."} /> : createStuForm}
    </div>
  )
}

export default RegisterStudentPage;
