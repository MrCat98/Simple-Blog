import Tags from "./Tag";
import Userinfo from "./Userinfo";
import Button from "./Button";
import PropTypes from "prop-types";

const PostList =({onHandleClick, likes, articles }) => {
    return(
  
        <ul className="postList">
            <li className="post">
                <div className="postHeading">
                    <Userinfo  
                    articles={articles}
                    />
                    <Button
                        onHandleClick={onHandleClick}
                        likes={likes}
                    />
                </div>
                <div className="postContent">
                    <h3>{articles[0]?.title}</h3>
                    <p className="postContent">
                        {articles[0]?.description}
                    </p>
                    <Tags
                    articles={articles}
                    />  
            
                </div>
            </li> 
        </ul> 
    )
}

PostList.propTypes = {
    onHandleClick: PropTypes.func.isRequired,
    likes:PropTypes.number.isRequired,
    onDoubleClick: PropTypes.func.isRequired

}



export default PostList;