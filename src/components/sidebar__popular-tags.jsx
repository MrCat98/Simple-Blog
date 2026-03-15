  import Tags from "./Tag";
  
  const Sidebar =({articles})=>{
    return(
      <div className="sidebar__popular-tags">
        <h3>Popular tags</h3>
        <Tags
        articles={articles}
        />
      </div>
    )
  }

  export default Sidebar;