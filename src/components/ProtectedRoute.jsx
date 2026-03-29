import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ isLoggedIn }) => {
    if (!isLoggedIn){
        return <Navigate to ="/signin" replace/>
    }else{
        return <Outlet/>
    }
};

export default ProtectedRoute