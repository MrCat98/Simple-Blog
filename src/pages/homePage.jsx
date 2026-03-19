import PostList from "../components/Post";
import PaginationBar from "../components/PaginationBar";
import Navigation from "../components/NavbarFrame";
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
            tags={articles.tagList}
            />
            <div className="content">
                { articles.map(article =>(
                <PostList
                    handleClick={handleClick}
                    likes={likes}
                    key={article.slug}
                    articles={articles}/>))
                }
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
    
