import { Outlet } from "react-router-dom";
import Navigation from "../components/Navigation";


const MainLayout = ({log}) => {
 


  return (
    <div className="homePage">
      <Navigation  log={log}/>
      <Outlet />
    </div>
  );
};

export default MainLayout;
