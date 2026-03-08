import penIcon from '../PNG/pen.svg'
import settingsIcon from '../PNG/settings.svg'
import profileIcon from '../PNG/user.svg'

const Navigation =() => {
    return(
        <nav className="navigation">
            <h3 className="navigation__Title">Realworld-blog</h3>
            <ul className="navigation__List">
                <li><a href="/">Home</a></li>
                <li>
                    <a href="/about">
                        <img className="new-post-svg" src={penIcon} alt="New Post"/>
                        <span>New Post</span>
                    </a>
                </li>
                <li>
                    <a href="/contact">
                        <img className="settings-svg" src={settingsIcon} alt="Settings"/>
                        <span>Settings</span>
                    </a>
                </li>
                <li>
                    <a href="/profile" className="Profile">
                        <img className="profile-svg" src={profileIcon} alt="Profile"/>
                        <span>Profile</span>
                    </a>
                </li>
            </ul>
        </nav>
    )
}

export default Navigation;