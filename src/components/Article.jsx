import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Article = ({ articleDescription, articleTitle, article }) => {
  return (
    <div className="Article">
      <Link to={`/articlepage/${article.slug}`} className="Article-Link">
        <h3>{articleTitle}</h3>
      </Link>
      <p>{articleDescription}</p>
    </div>
  );
};

Article.propTypes = {
  articleDescription: PropTypes.string,
  articleTitle: PropTypes.string,
  article: PropTypes.shape({
    slug: PropTypes.string.isRequired,
  }).isRequired,
};

export default Article;
