import React from "react";
import Sidebar from "./Sidebar";

const PostList =() => {
    return(
        <div className="postList">
            <h2>Это заголовок списка постов</h2>
            <p>Это описание списка постов</p>
            <Sidebar/>
        </div>
    )
}

export default PostList;