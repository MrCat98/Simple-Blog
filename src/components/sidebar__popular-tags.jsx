  import Tags from "./Tag";
  
  const Sidebar =({tags})=>{
    return(
      <div className="sidebar__popular-tags">
        <h3>Popular tags</h3>
        <Tags
        tags={tags}
        />
      </div>
    )
  }

  export default Sidebar;