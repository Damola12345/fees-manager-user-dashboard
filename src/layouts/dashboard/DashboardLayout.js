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
    <div className="flex">
      <SideNav />
      <div className="h-screen w-[calc(100%-65px)] overflow-scroll">
        <Header />
        <div className="h-[calc(100%)] full overflow-scroll">
          <div className="px-5 md:px-10 xl:px-20 pt-20">{children}</div>
          {/* <div className="h-screen w-full"></div> */}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
