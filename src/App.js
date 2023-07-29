//import VerifyEmail from './components/verifyEmail/VerifyEmail';
import './global.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useParams } from "react-router-dom"
import React from 'react';
import {
  Classrooms,
  DeleteClassroom,
  DeleteSchool,
  DeleteStudent,
  EditClassroomData,
  EditSchoolData,
  EditStudentData,
  Home,
  Login,
  MakePayment,
  Payments,
  RegisterClassroom,
  RegisterSchool,
  RegisterStudent,
  ResetPassword,
  Schools,
  Signup,
  Students,
  UserProfile,
  Verify,
  ViewClassroom,
  ViewPayment,
  ViewSchool,
  ViewStudent,
} from './pages/01-AllPages/AllPages';

function App() {
  //const { className } = useParams()
  const { studentName } = useParams()

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path='/verify-email' element={<Verify />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route path='/profile' element={<UserProfile />} />

        <Route path="/schools" element={<Schools />} />
        <Route path="/register-school" element={<RegisterSchool />} />
        <Route path="/schools/:schoolName" element={<ViewSchool />} />
        <Route path='/schools/:schoolName/edit' element={<EditSchoolData />} />
        <Route path='/schools/:schoolName/delete' element={<DeleteSchool />} />

        <Route path="/register-classroom" element={<RegisterClassroom />} />
        <Route path="/classrooms" element={<Classrooms />} />
        <Route path="/classrooms/:className" element={<ViewClassroom />} />
        <Route path='/classrooms/:className/edit' element={<EditClassroomData />} />
        <Route path='/classrooms/:className/delete' element={<DeleteClassroom />} />

        <Route path="/register-student" element={<RegisterStudent />} />
        <Route path="/students" element={<Students />} />
        <Route path="/students/:studentId" element={<ViewStudent id={studentName} forceRefresh={true}/>} />
        <Route path='/students/:studentId/edit' element={<EditStudentData />} />
        <Route path='/students/:studentId/delete' element={<DeleteStudent />} />

        <Route path="/payments" element={<Payments />} />
        <Route path="/make-payment" element={<MakePayment />} />
        <Route path="/payments/:paymentId" element={<ViewPayment id={studentName}/>} />
      </Routes>
    </Router>
  )
}

//<Route path="/schools/:schoolName/students" element={<Students group="school" id="schoolName" />} />
//<Route path="/schools/:schoolName/classrooms" element={<Classrooms group="school" id="schoolName" />} />
//<Route path="/schools/:schoolName/payments" element={<Payments group="school" id="schoolName" />} />

//<Route path="/schools/:schoolName/students/:studentName" element={<Students group="school" id="schoolName" />} />
//<Route path="/schools/:schoolName/classrooms/:className" element={<Classrooms group="school" id="schoolName" />} />
//<Route path="/schools/:schoolName/payments/:paymentID" element={<Payments group="school" id="schoolName" />} />

//<Route path="/schools/:schoolName/classrooms/:className/students" element={<Classrooms group="class" id="schoolName" />} />
//<Route path="/schools/:schoolName/classrooms/:className/payments" element={<Payments group="class" id="schoolName" />} />

//<Route path="/schools/:schoolName/students/:studentName/payments" element={<Payments group="class" id="schoolName" />} />

//<Route path="/schools/:schoolName/register-student" element={<Students group="school" id="schoolName" />} />
//<Route path="/schools/:schoolName/register-classroom" element={<Classrooms group="school" id="schoolName" />} />
//<Route path="/schools/:schoolName/make-payment" element={<Payments group="school" id="schoolName" />} />

//edit school
//edit class
//edit student

//delete school
//delete class
//delete student

//<Route path="/classrooms/:className/students" element={<Classrooms />} />
//<Route path="/students" element={<Students />} />

export default App;
