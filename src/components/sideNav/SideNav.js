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
          <div className="nav-con__top-link">
            <NavLink to="/schools" className="item group">
              <SchoolIcon />
              <p className="description group-hover:block">Schools</p>
            </NavLink>
          </div>
          {currentSchool && (
            <div className="nav-con__top-link">
              <NavLink to="/classrooms" className="item group">
                <ClassroomIcon />
                <p className="description group-hover:block">Classrooms</p>
              </NavLink>
            </div>
          )}
          {currentSchool && (
            <div className="nav-con__top-link">
              <NavLink to="/students" className="item group">
                <StudentsIcon />
                <p className="description group-hover:block">Students</p>
              </NavLink>
            </div>
          )}
          {currentSchool && (
            <div className="nav-con__top-link">
              <NavLink to="/payments" className="item group">
                <PaymentsIcon />
                <p className="description group-hover:block">Payments</p>
              </NavLink>
            </div>
          )}
        </div>
      </div>

      <div className="nav-con__bottom">
        <div className="nav-con__bottom-link">
          <NavLink
            to="/profile"
            className="nav-con__bottom-link group border-b-[0.5px] border-b-white"
          >
            <ProfileIcon />
            <p className="description group-hover:block">Profile</p>
          </NavLink>
        </div>
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
