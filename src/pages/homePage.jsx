import React from "react";
import Header from "../components/Header";
import PostList from "../components/PostList";
import PaginationBar from "../components/PaginationBar";

const HomePage =()=>{
    return(
        <>
        <Header/>
        <PostList/>
        <PaginationBar/>
        </>
    )
}

export default HomePage
    
