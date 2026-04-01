import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Импортируем хук

const ProtectedRoute = () => {
    const { isAuthenticated, isLoading } = useAuth();

    // Ждем, пока завершится проверка токена при загрузке
    if (isLoading) {
        return <div>Загрузка...</div>; 
    }

    // Если не авторизован — на страницу входа
    if (!isAuthenticated) {
        return <Navigate to="/signin" replace />;
    }

    // Если авторизован — показываем вложенные роуты
    return <Outlet />;
};

export default ProtectedRoute;
