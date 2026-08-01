import { useAuth } from "../context/AuthContext";

const ProfilePage = () => {
  const { user } = useAuth();

  return (
    <div className="profile-page--wrapper">

      <h1>{user?.username}</h1>
      <p>{user?.email}</p>
    </div>
  );
};

export default ProfilePage;
