import { useNavigate, useParams } from "react-router-dom";
import AllClassroomsPage from "../AllClassroomsPage/AllClassroomsPage";
import CreatePaymentPage from "../CreatePaymentPage/CreatePaymentPage";
import DeleteView from "../../components/deleteView/deleteView";
import DetailView from "../../components/DetailView/DetailView";
import EditClassroom from "../../components/editView/editClassroom";
import EditSchool from "../../components/editView/editSchool";
import EditStudent from "../../components/editView/editStudent";
import Footer from "../../components/Footer/Footer";
import LoginPage from "../LoginPage/LoginPage";
import PageLayout from "../../components/PageLayout/PageLayout";
import PaymentsPage from "../PaymentsPage/PaymentsPage";
import ProfilePage from "../ProfilePage/ProfilePage";
import React, { useEffect, useState } from "react";
import RegisterClassroomPage from "../RegisterClassroomPage/RegisterClassroomPage";
import ResetPwdPage from "../ResetPwdPage/ResetPwdPage";
import SchoolsPage from "../SchoolsPage/SchoolsPage";
import SignupPage from "../SignupPage/SignupPage";
import StudentsPage from "../StudentsPage/StudentsPage";
import RegisterStudentPage from "../RegisterStudentPage/RegisterStudentPage";
import VerifyEmailPage from "../VerifyEmailPage/VerifyEmailPage";
import WebsiteHeader from "../../components/Header/WebsiteHeader";
import WelcomePage from "../WelcomePage/WelcomePage";
import RegsisterSchoolPage from "../RegisterSchoolPage/RegisterSchoolPage";

let globalUser = null;
const screenStyle = "m-0 p-0 w-screen h-screen";
const BACKEND_HOST = process.env.REACT_APP_BACKEND_HOST;

const GetcurrentUser = async () => {
  try {
    const res = await fetch(`${BACKEND_HOST}/auth/`, {
      method: "GET",
      credentials: "include",
    });
    if (res.ok) {
      const data = await res.json();
      localStorage.setItem("user", JSON.stringify(data));
      return data;
    }
  } catch {
    return null;
  }
  //navigate('/login');
  return null;
};

export const Home = () => {
  const [currentUser, setcurrentUser] = useState(globalUser);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const getUser = GetcurrentUser;

  const getUserFunc = async () => {
    const user = await getUser();
    setcurrentUser(user);
    setIsLoading(false);
    if (!user) {
      navigate("/login");
    }
  };
  useEffect(() => {
    getUserFunc();
    //localStorage.setItem('currentSchool', '');
  }, []);

  if (isLoading) {
    return <div></div>;
  }

  return (
    <PageLayout>
      <WelcomePage name={currentUser ? currentUser.firstname : null} />
    </PageLayout>
  );
};

export const Login = () => {
  return (
    <div className={screenStyle}>
      <LoginPage />
    </div>
  );
};

export const Signup = () => {
  return (
    <div className={screenStyle}>
      <SignupPage />
    </div>
  );
};

export const Verify = () => {
  return (
    <div>
      <VerifyEmailPage />
    </div>
  );
};

export const ResetPassword = () => {
  return (
    <div>
      <ResetPwdPage />
    </div>
  );
};

export const UserProfile = () => {
  return (
    <div>
      <ProfilePage />
    </div>
  );
};

export const Students = () => {
  return (
    <PageLayout>
      <StudentsPage />
    </PageLayout>
  );
};

export const RegisterStudent = () => {
  return (
    <PageLayout>
      <RegisterStudentPage />
    </PageLayout>
  );
};

export const Schools = () => {
  return (
    <PageLayout>
      <SchoolsPage />
    </PageLayout>
  );
};

export const RegisterSchool = () => {
  return (
    <PageLayout>
      <RegsisterSchoolPage />
    </PageLayout>
  );
};

export const Classrooms = () => {
  return (
    <PageLayout>
      <AllClassroomsPage />
    </PageLayout>
  );
};

export const Payments = () => {
  return (
    <PageLayout>
      <PaymentsPage />
    </PageLayout>
  );
};

export const MakePayment = () => {
  return (
    <PageLayout>
      <CreatePaymentPage />
    </PageLayout>
  );
};

export const RegisterClassroom = () => {
  return (
    <PageLayout>
      <RegisterClassroomPage />
    </PageLayout>
  );
};

export const ViewSchool = () => {
  const { schoolName } = useParams();
  let queryObj = { resource: "schools", filter: schoolName.replace(" ", "_") };

  return (
    <PageLayout>
      <DetailView queryObj={queryObj} view="school" />
    </PageLayout>
  );
};

export const ViewClassroom = () => {
  //Use the student id to query the api
  const { className } = useParams();
  let queryObj = {
    resource: "classrooms",
    filter: className.replace(" ", "_"),
  };

  return (
    <PageLayout>
      <DetailView queryObj={queryObj} view="classroom" />
    </PageLayout>
  );
};

export const ViewStudent = () => {
  //Use the student id to query the api
  const { studentId } = useParams();
  let queryObj = { resource: "students", filter: studentId };

  return (
    <PageLayout>
      <DetailView queryObj={queryObj} view="student" studentId={studentId} />
    </PageLayout>
  );
};

export const ViewPayment = (props) => {
  //Use the payment id to query the api
  const { paymentId } = useParams();
  let queryObj = { resource: "payments", filter: paymentId };

  return (
    <PageLayout>
      <DetailView queryObj={queryObj} view="payment" />
    </PageLayout>
  );
};

export const EditSchoolData = () => {
  const schoolName = localStorage.currentSchool;

  return (
    <div>
      <EditSchool id={schoolName} view="school" />
    </div>
  );
};

export const EditClassroomData = () => {
  const { className } = useParams();

  return (
    <div>
      <EditClassroom id={className} view="classroom" />
    </div>
  );
};

export const EditStudentData = () => {
  const { studentId } = useParams();

  return (
    <div>
      <EditStudent id={studentId} view="student" />
    </div>
  );
};

export const DeleteSchool = () => {
  const { schoolName } = useParams();

  return (
    <div>
      <DeleteView view="school" id={schoolName} />
    </div>
  );
};

export const DeleteClassroom = () => {
  const { className } = useParams();

  return (
    <div>
      <DeleteView view="classroom" id={className} />
    </div>
  );
};

export const DeleteStudent = () => {
  const { studentId } = useParams();

  return (
    <div>
      <DeleteView view="student" id={studentId} />
    </div>
  );
};
