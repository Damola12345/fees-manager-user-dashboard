import { useEffect } from "react";
import Header from "../../components/Header/Header";
import SideNav from "../../components/sideNav/SideNav";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useDashboard } from "../../contexts/DashboardContext";

const DashboardLayout = ({ children }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const dashboard = useDashboard();

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user]);

  return (
    <div className="dashboard">
      <SideNav />
      <div className="dashboard__display">
        <Header />
        <div className="dashboard__display-con">
          <div className="content">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
