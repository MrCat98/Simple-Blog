import React from "react";
import PostList from "../components/PostList";
import PaginationBar from "../components/PaginationBar";
import Navigation from "../components/NavbarFrame";
import Default from "../components/Default";

const HomePage =({handleClick, count})=>{
    return(
        <>
        <Navigation/>
        <Default/>
        <PostList
            handleClick={handleClick}
            count={count}
        />
        <PaginationBar/>
        </>
    )
}

export default HomePage
    
