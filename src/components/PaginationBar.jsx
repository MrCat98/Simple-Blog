import PropTypes from "prop-types";

const PaginationBar = ({ page, setPage, totalPages }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="pagination-bar">
      {pages.map((num) => (
        <button
          key={num}
          className={page === num ? "active" : ""}
          onClick={() => setPage(num)}>
          {num}
        </button>
      ))}
    </div>
  );
};

PaginationBar.propTypes = {
  page: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
  totalPages: PropTypes.number.isRequired,
};

export default PaginationBar;
