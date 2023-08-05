import { ReactComponent as BellIcon } from "../../assets/svg/bell.svg";
import { ReactComponent as BriefCase } from "../../assets/svg/briefcase.svg";
import { ReactComponent as LogoutIcon } from "../../assets/svg/logout.svg";
import { ReactComponent as PaymentIcon } from "../../assets/svg/payments.svg";
import { ReactComponent as ProfileIcon } from "../../assets/svg/profile.svg";
import { useAuth } from "../../contexts/AuthContext";
import { useDashboard } from "../../contexts/DashboardContext";
import { useNavigate } from "react-router-dom";
import CircleBar from "../../components/CircleBar/CircleBar";
import DisplayButton from "../../components/DisplayCard/DisplayButton";
import DisplayCard from "../../components/DisplayCard/DisplayCard";
import DisplayIcon from "../../components/DisplayCard/DisplayIcon";

const HomePage = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { currentSchool } = useDashboard();

  const goToSchool = () => {
    if (currentSchool) navigate(`/schools/${currentSchool._id}`);
    else navigate("/schools");
  };

  return (
    <div className={`home`}>
      <div className="w-full">
        <h1 className="home__header">Welcome {user?.firstname}!</h1>
        <div className={`home__cards`}>
          <DisplayCard>
            <DisplayIcon>
              <BriefCase />
            </DisplayIcon>
            <p className="home__cards-text">
              {currentSchool
                ? "Continue right where you left off!"
                : "Select a school to get started."}
            </p>

            <DisplayButton onClick={goToSchool} full>
              Management Console
            </DisplayButton>
          </DisplayCard>
          <DisplayCard>
            <DisplayIcon>
              <PaymentIcon />
            </DisplayIcon>
            <p className="home__cards-text">
              Get a breakdown of all payments to your account.
            </p>
            <DisplayButton full onClick={() => navigate("/payments")}>
              View Payments
            </DisplayButton>
          </DisplayCard>
          <DisplayCard className="pt-20 gap-1 px-5 xl:px-20 flex-grow max-w-[500px]">
            <DisplayButton
              light
              icon={
                <div className="group-hover:scale-[1.2]">
                  <BellIcon width={18} height={18} />
                  <p className="notification-count">9</p>
                </div>
              }
              full
            >
              Notifications
            </DisplayButton>

            <DisplayButton
              light
              icon={<ProfileIcon width={20} height={20} />}
              onClick={() => navigate("/profile")}
              full
            >
              Profile
            </DisplayButton>
            <button onClick={logout} className="home-logout group">
              <p className="hidden group-hover:block">Logout</p>
              <LogoutIcon className="group-hover:translate-x-0.5 transition-all duration-200" />
            </button>
          </DisplayCard>
        </div>
      </div>

      <div className="home__footer">
        <div className="home__footer-left">
          <h2 className="heading">
            Unlock the full potentials of your business.
          </h2>
          <p className="text">
            I need some content to go here to make the page look complete. It is
            really difficult to think of something right now. I am sure it will
            come around!
          </p>
        </div>
        <div className="home__footer-border"></div>
        <div className="home__footer-right">
          <div>
            <p className="text">
              100% of all fees have been paid accross all your schools.
            </p>
            <DisplayButton light shadow>
              See Breakdown
            </DisplayButton>
          </div>
          <div className="progress-bar">
            <CircleBar percentage={"100%"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
