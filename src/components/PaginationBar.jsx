import React from "react";
import PaginationButton from "./PaginationButton";

const PaginationBar =() => {
    return(
        <div className="pagination-bar">
            <PaginationButton text="Предыдущая"/>
            <PaginationButton text="Следующая"/>
            <PaginationButton text="1"/>
            <PaginationButton text="2"/>
            <PaginationButton text="3"/>
        </div>
    )
}

export default PaginationBar;