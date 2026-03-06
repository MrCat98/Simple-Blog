import React from "react";
import Default from './Default'
import Navigation from'./NavbarFrame'


const Header =() => {
    return(
        <header className="header">
            <Navigation/>
            <Default/>
        </header>
    )
}

export default Header;