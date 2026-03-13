import Tags from "./Tag";
import Userinfo from "./Userinfo";
import Button from "./Button";
import PropTypes from "prop-types";

const PostList =({onHandleClick, likes }) => {
    return(
  
        <ul className="postList">
            <li className="post">
                <div className="postHeading">
                    <Userinfo  />
                    <Button
                        onHandleClick={onHandleClick}
                        likes={likes}
                    />
                </div>
                <div className="postContent">
                    <p className="postContent">
                        Это содержание поста
                    </p>
                    <Tags/>  
            
                </div>
            </li>

            <li className="post">
                <div className="postHeading">
                    <Userinfo/>
                    <Button
                        onHandleClick={onHandleClick}
                        likes={likes}
                    />
                </div>
                <div className="postContent">
                    <p className="postContent">
                        Это содержание поста
                    </p>
                    <Tags/>  
            
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