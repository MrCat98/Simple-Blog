import penIcon from '../assets/pen.svg'
import settingsIcon from '../assets/settings.svg'
import profileIcon from '../assets/user.svg'
import { Link} from 'react-router-dom';

const Navigation =() => {
    const links =[
        {path: "/",
            label: "Home",
            icon: null
        },
        {path: "/new-post",
             label: "New Post", 
             icon: penIcon},
        {path: "/settings", 
            label: "Settings", 
            icon: settingsIcon},
        {path: "/profile", 
            label: "Profile", 
            icon: profileIcon

        }
    ]

    return(
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
    )
}

export default Navigation;
                  