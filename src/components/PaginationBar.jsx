
const PaginationBar =({page, setPage, totalPages}) => {

    const pages = Array.from({length:totalPages},
        (_,i)=>i+1
    )
    
    return(
        <div className="pagination-bar">
      {pages.map(num => (
        <button
          key={num}
          className={page === num ? "active" : ""}
          onClick={() => setPage(num)}
        >
          {num}
        </button>
      ))}

    </div>
    )
}

export default PaginationBar;