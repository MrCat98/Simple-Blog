import penIcon from "../assets/pen.svg";
import settingsIcon from "../assets/settings.svg";
import profileIcon from "../assets/user.svg";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navigation = () => {
  const { isAuthenticated, user } = useAuth(); 

  const links = [{ path: "/", label: "Home", icon: null }];

  if (isAuthenticated) {
    links.push(
      { path: "/new-post", label: "New Post", icon: penIcon },
      { path: "/settings", label: "Settings", icon: settingsIcon },
      { path: "/profile", label: user?.username||"Profile", icon: profileIcon },
    );
  } else {
    links.push(
      { path: "/signin", label: "Sign In", icon: null }, // Исправил опечатку Sing -> Sign
      { path: "/signup", label: "Sign Up", icon: null }, // Добавил слэш /signup
    );
  }

  return (
    <nav className="navigation">
      <h3 className="navigation__Title">Realworld-blog</h3>

      <ul className="navigation__List">
        {links.map((link, index) => (
          <li key={index}>
            <Link to={link.path}>
              {link.icon && <img src={link.icon} alt={link.label} />}
              <span>{link.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
