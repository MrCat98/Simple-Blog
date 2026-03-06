

const Navigation =() => {
    return(
        <nav className="navigation">
            <ul className="navList">
                <li><a href="/">Home</a></li>
                <li><a href="/about">New Post</a></li>
                <li><a href="/contact">Setings</a></li>
                <li><a href="/profile" className="Profile">Profile</a></li>
            </ul>
        </nav>
    )
}

export default Navigation;