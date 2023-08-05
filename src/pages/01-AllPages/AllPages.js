import { useParams } from "react-router-dom";
import AllClassroomsPage from "../classrooms/ClassroomsPage";
import CreatePaymentPage from "../payments/CreatePaymentPage";
import DetailView from "../../layouts/details/DetailView";
import EditClassroom from "../classrooms/editClassroom";
import EditSchool from "../schools/editSchool";
import EditStudent from "../students/editStudent";
import LoginPage from "../auth/LoginPage";
import PaymentsPage from "../payments/PaymentsPage";
import ProfilePage from "../ProfilePage/ProfilePage";
import RegisterClassroomPage from "../classrooms/RegisterClassroomPage";
import ResetPwdPage from "../auth/ResetPwdPage";
import SchoolsPage from "../schools/SchoolsPage";
import SignupPage from "../auth/SignupPage";
import AuthLayout from "../../layouts/auth/AuthLayout";
import StudentsPage from "../students/StudentsPage";
import RegisterStudentPage from "../students/RegisterStudentPage";
import VerifyEmailPage from "../auth/VerifyEmailPage";
import HomePage from "../HomePage/HomePage";
import RegsisterSchoolPage from "../schools/RegisterSchoolPage";
import DashboardLayout from "../../layouts/dashboard/DashboardLayout";

export const Home = () => {
  return (
    <DashboardLayout>
      <HomePage />
    </DashboardLayout>
  );
};

export const Login = () => {
  return (
    <AuthLayout>
      <LoginPage />
    </AuthLayout>
  );
};

export const Signup = () => {
  return (
    <AuthLayout>
      <SignupPage />
    </AuthLayout>
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
    <DashboardLayout>
      <StudentsPage />
    </DashboardLayout>
  );
};

export const RegisterStudent = () => {
  return (
    <DashboardLayout>
      <RegisterStudentPage />
    </DashboardLayout>
  );
};

export const Schools = () => {
  return (
    <DashboardLayout>
      <SchoolsPage />
    </DashboardLayout>
  );
};

export const RegisterSchool = () => {
  return (
    <DashboardLayout>
      <RegsisterSchoolPage />
    </DashboardLayout>
  );
};

export const Classrooms = () => {
  return (
    <DashboardLayout>
      <AllClassroomsPage />
    </DashboardLayout>
  );
};

export const Payments = () => {
  return (
    <DashboardLayout>
      <PaymentsPage />
    </DashboardLayout>
  );
};

export const MakePayment = () => {
  return (
    <DashboardLayout>
      <CreatePaymentPage />
    </DashboardLayout>
  );
};

export const RegisterClassroom = () => {
  return (
    <DashboardLayout>
      <RegisterClassroomPage />
    </DashboardLayout>
  );
};

export const ViewSchool = () => {
  const schoolId = window.location.pathname.split("/")[2];
  let queryObj = { resource: "schools", filter: schoolId };

  return (
    <DashboardLayout>
      <DetailView queryObj={queryObj} view="school" />
    </DashboardLayout>
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
    <DashboardLayout>
      <DetailView queryObj={queryObj} view="classroom" />
    </DashboardLayout>
  );
};

export const ViewStudent = () => {
  //Use the student id to query the api
  const { studentId } = useParams();
  let queryObj = { resource: "students", filter: studentId };

  return (
    <DashboardLayout>
      <DetailView queryObj={queryObj} view="student" studentId={studentId} />
    </DashboardLayout>
  );
};

export const ViewPayment = (props) => {
  //Use the payment id to query the api
  const { paymentId } = useParams();
  let queryObj = { resource: "payments", filter: paymentId };

  return (
    <DashboardLayout>
      <DetailView queryObj={queryObj} view="payment" />
    </DashboardLayout>
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
