//import VerifyEmail from './components/verifyEmail/VerifyEmail';
import "./global.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";
import {
  Classrooms,
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
} from "./pages/01-AllPages/AllPages";
import { AuthProvider } from "./contexts/AuthContext";
import { DashboardProvider } from "./contexts/DashboardContext";

function App() {
  return (
    <DashboardProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/verify-email" element={<Verify />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/profile" element={<UserProfile />} />

            <Route path="/schools" element={<Schools />} />
            <Route path="/schools/register" element={<RegisterSchool />} />
            <Route path="/schools/:schoolId" element={<ViewSchool />} />
            <Route
              path="/schools/:schoolId/edit"
              element={<EditSchoolData />}
            />

            <Route
              path="/classrooms/register"
              element={<RegisterClassroom />}
            />
            <Route path="/classrooms" element={<Classrooms />} />
            <Route path="/classrooms/:classId" element={<ViewClassroom />} />
            <Route
              path="/classrooms/:classId/edit"
              element={<EditClassroomData />}
            />

            <Route path="/students/register" element={<RegisterStudent />} />
            <Route path="/students" element={<Students />} />
            <Route
              path="/students/:studentId"
              element={
                <ViewStudent /* id={studentName} forceRefresh={true} */ />
              }
            />
            <Route
              path="/students/:studentId/edit"
              element={<EditStudentData />}
            />

            <Route path="/payments" element={<Payments />} />
            <Route path="/payments/create" element={<MakePayment />} />
            <Route
              path="/payments/:paymentId"
              element={<ViewPayment /* id={studentName} */ />}
            />
          </Routes>
        </Router>
      </AuthProvider>
    </DashboardProvider>
  );
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
