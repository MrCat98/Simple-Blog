import PostList from "../components/Post";
import PaginationBar from "../components/PaginationBar";
import Navigation from "../components/NavbarFrame";
import Default from "../components/Default";
import Sidebar from "../components/sidebar__popular-tags";
import PropTypes from "prop-types";


const HomePage =({handleClick, likes})=>{

return(
    <div className="homePage">

        <Navigation/>

        <Default/>

        <div className="content-container">
            <Sidebar />
            <div className="content">
                <PostList
                    handleClick={handleClick}
                    likes={likes}
                />
                <PaginationBar/>
            </div>
        </div>
    </div>
    )
}

HomePage.propTypes = {
    handleClick: PropTypes.func.isRequired,
    likes:PropTypes.number.isRequired,
}

export default HomePage
    
