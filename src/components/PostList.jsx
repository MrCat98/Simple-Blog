import React from "react";
import Sidebar from "./Sidebar";
import Userinfo from "./Userinfo";
import Button from "./Button";

const PostList =({handleClick, likes}) => {
    return(
        <div className="postList">
            <Userinfo/>
            <Button
                handleClick={handleClick}
                likes={likes}
            />
            <h2>Это заголовок списка постов</h2>
            <p>Это описание списка постов</p>
            <Sidebar/>
        </div>
    )
}

export default PostList;