import { useAuth } from "../context/AuthContext"; // Импортируем хук
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const { logout, user } = useAuth(); // Достаем функцию выхода и данные пользователя
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    logout(); // Очищаем состояние и localStorage
    navigate("/signin"); // Перенаправляем на страницу входа
  };

  return (
    <div className="profile-page">
      <h1>Профиль пользователя: {user?.username}</h1>
      <p>Email: {user?.email}</p>
      
      <button onClick={handleLogoutClick}>
        Logout
      </button>
    </div>
  );
};

export default ProfilePage;
