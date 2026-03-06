import React from "react";
import Header from "../components/Header";
import PostList from "../components/PostList";
import PaginationBar from "../components/PaginationBar";

const HomePage =({handleClick, count})=>{
    return(
        <>
        <Header/>
        <PostList
            handleClick={handleClick}
            count={count}
        />
        <PaginationBar/>
        </>
    )
}

export default HomePage
    
