import PostList from "../components/Post";
import PaginationBar from "../components/PaginationBar";
import Navigation from "../components/Navbar Frame";
import Default from "../components/Default";
import Sidebar from "../components/sidebar__popular-tags";
import PropTypes from "prop-types";


const HomePage =({handleClick, likes,articles
})=>{

return(
    <div className="homePage">
        <Navigation/>

        <Default/>

        <div className="content-container">
            <Sidebar 
            articles={articles}
            />
            <div className="content">
                <PostList
                    handleClick={handleClick}
                    likes={likes}
                    articles={articles}
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
    
