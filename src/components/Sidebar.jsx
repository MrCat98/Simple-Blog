  import React from "react";
  import Tags from "./Tags";
  
  const Sidebar =() => {
    return(
      <div className="sidebar">
        <h2>Это заголовок боковой панели</h2>
        <p>Это описание боковой панели</p>
        <Tags/>
      </div>
    )
  }

  export default Sidebar;