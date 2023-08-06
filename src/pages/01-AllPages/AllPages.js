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
  document.title = "Fees Manager | Home";
  return (
    <DashboardLayout>
      <HomePage />
    </DashboardLayout>
  );
};

export const Login = () => {
  document.title = "Fees Manager | Login";
  return (
    <AuthLayout>
      <LoginPage />
    </AuthLayout>
  );
};

export const Signup = () => {
  document.title = "Fees Manager | Signup";
  return (
    <AuthLayout>
      <SignupPage />
    </AuthLayout>
  );
};

export const Verify = () => {
  document.title = "Fees Manager | Verify Account";
  return (
    <div>
      <VerifyEmailPage />
    </div>
  );
};

export const ResetPassword = () => {
  document.title = "Fees Manager | Reset Password";
  return (
    <div>
      <ResetPwdPage />
    </div>
  );
};

export const UserProfile = () => {
  document.title = "Fees Manager | Profile";
  return (
    <div>
      <ProfilePage />
    </div>
  );
};

export const Students = () => {
  document.title = "Fees Manager | Students";
  return (
    <DashboardLayout>
      <StudentsPage />
    </DashboardLayout>
  );
};

export const RegisterStudent = () => {
  document.title = "Fees Manager | Register student";
  return (
    <DashboardLayout>
      <RegisterStudentPage />
    </DashboardLayout>
  );
};

export const Schools = () => {
  document.title = "Fees Manager | Schools";
  return (
    <DashboardLayout>
      <SchoolsPage />
    </DashboardLayout>
  );
};

export const RegisterSchool = () => {
  document.title = "Fees Manager | Register school";
  return (
    <DashboardLayout>
      <RegsisterSchoolPage />
    </DashboardLayout>
  );
};

export const Classrooms = () => {
  document.title = "Fees Manager | Classrooms";
  return (
    <DashboardLayout>
      <AllClassroomsPage />
    </DashboardLayout>
  );
};

export const Payments = () => {
  document.title = "Fees Manager | Payments";
  return (
    <DashboardLayout>
      <PaymentsPage />
    </DashboardLayout>
  );
};

export const MakePayment = () => {
  document.title = "Fees Manager | Make payment";
  return (
    <DashboardLayout>
      <CreatePaymentPage />
    </DashboardLayout>
  );
};

export const RegisterClassroom = () => {
  document.title = "Fees Manager | Register Classroom";
  return (
    <DashboardLayout>
      <RegisterClassroomPage />
    </DashboardLayout>
  );
};

export const ViewSchool = () => {
  const schoolId = window.location.pathname.split("/")[2];
  let queryObj = { resource: "schools", filter: schoolId };
  document.title = "Fees Manager | View school";

  return (
    <DashboardLayout>
      <DetailView queryObj={queryObj} view="school" />
    </DashboardLayout>
  );
};

export const ViewClassroom = () => {
  //Use the student id to query the api
  document.title = "Fees Manager | View classroom";
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
  document.title = "Fees Manager | View student";
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
  document.title = "Fees Manager | View payment";
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
  document.title = "Fees Manager | Edit school";

  return (
    <div>
      <EditSchool id={schoolName} view="school" />
    </div>
  );
};

export const EditClassroomData = () => {
  const { className } = useParams();
  document.title = "Fees Manager | Edit classroom";

  return (
    <div>
      <EditClassroom id={className} view="classroom" />
    </div>
  );
};

export const EditStudentData = () => {
  const { studentId } = useParams();
  document.title = "Fees Manager | Edit student";

  return (
    <div>
      <EditStudent id={studentId} view="student" />
    </div>
  );
};
