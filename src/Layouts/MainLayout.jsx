import { Outlet } from "react-router-dom";
import Navigation from "../components/Navigation";

const MainLayout = () => {
  return (
    <div className="homePage">
      <Navigation />
      <Outlet />
    </div>
  );
};

export default MainLayout;
