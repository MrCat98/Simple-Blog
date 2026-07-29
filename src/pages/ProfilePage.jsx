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
    <div className="profile-page--wrapper">

      <h1>{user?.username}</h1>
      <p>{user?.email}</p>
      
      <button onClick={handleLogoutClick}>
        Logout
      </button>
    </div>
  );
};

export default ProfilePage;
