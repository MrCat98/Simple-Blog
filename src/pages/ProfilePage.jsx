import { useAuth } from "../context/useAuth";
import profileIcon from "../assets/user.svg";

const ProfilePage = () => {
  const { user } = useAuth();

  return (
    <div className="profile-page--wrapper">
      <img
        className="profile-page__avatar"
        src={user?.image || profileIcon}
        alt={user?.username ? `Аватар ${user.username}` : "Аватар пользователя"}
        onError={(event) => {
          event.currentTarget.onerror = null;
          event.currentTarget.src = profileIcon;
        }}
      />
      <h1>{user?.username}</h1>
    </div>
  );
};

export default ProfilePage;
