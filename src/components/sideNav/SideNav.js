import { ReactComponent as LogoIcon } from "../../assets/svg/logo.svg";
import { ReactComponent as SchoolIcon } from "../../assets/svg/schools.svg";
import { ReactComponent as ProfileIcon } from "../../assets/svg/profile.svg";
import { ReactComponent as ClassroomIcon } from "../../assets/svg/classrooms.svg";
import { ReactComponent as StudentsIcon } from "../../assets/svg/students.svg";
import { ReactComponent as PaymentsIcon } from "../../assets/svg/payments.svg";
import { ReactComponent as LogoutIcon } from "../../assets/svg/logout.svg";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useDashboard } from "../../contexts/DashboardContext";

const SideNav = () => {
  const { logout } = useAuth();
  const { currentSchool } = useDashboard();

  return (
    <div className="nav-con">
      <div className="nav-con__top">
        <NavLink to="/" className="nav-con__top-home">
          <LogoIcon />
        </NavLink>

        <div className="mt-5">
          <NavLink to="/schools" className="nav-con__top-link group">
            <SchoolIcon />
            <p className="description group-hover:block">Schools</p>
          </NavLink>
          {currentSchool && (
            <NavLink to="/classrooms" className="nav-con__top-link group">
              <ClassroomIcon />
              <p className="description group-hover:block">Classrooms</p>
            </NavLink>
          )}
          {currentSchool && (
            <NavLink to="/students" className="nav-con__top-link group">
              <StudentsIcon />
              <p className="description group-hover:block">Students</p>
            </NavLink>
          )}
          {currentSchool && (
            <NavLink to="/payments" className="nav-con__top-link group">
              <PaymentsIcon />
              <p className="description group-hover:block">Payments</p>
            </NavLink>
          )}
        </div>
      </div>

      <div className="nav-con__bottom">
        <NavLink
          to="/profile"
          className="nav-con__bottom-link group border-b-[0.5px] border-b-white"
        >
          <ProfileIcon />
          <p className="description group-hover:block">Profile</p>
        </NavLink>
        <button
          type="button"
          className="nav-con__bottom-link group"
          onClick={() => logout()}
        >
          <LogoutIcon />
          <p className="description group-hover:block">Logout</p>
        </button>
      </div>
    </div>
  );
};

export default SideNav;
