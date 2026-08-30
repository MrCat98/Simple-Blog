import PropTypes from "prop-types";

const SidebarPopularTags = ({ articles }) => {
  const tags = [
    ...new Set(
      articles
        .flatMap((article) => article.tagList || [])
        .filter((tag) => tag && typeof tag === "string"),
    ),
  ].slice(0, 5);

  return (
    <div className="sidebar__popular-tags-wrapper">
      <div className="popular-tag">

      <h3>Popular tags</h3>

      <ul>
        {tags
          .filter((tag) => tag !== null)
          .map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
      </ul></div>
    </div>
  );
};

SidebarPopularTags.propTypes = {
  articles: PropTypes.arrayOf(
    PropTypes.shape({
      tagList: PropTypes.arrayOf(PropTypes.string),
    }),
  ).isRequired,
};

export default SidebarPopularTags;
