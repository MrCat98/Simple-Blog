import PropTypes from "prop-types";
import prof from "../assets/Icon.svg";

const UserInfo = ({ article, formatDate }) => {
  return (
    <div className="UserInfo">
      <img
        className="profile-image"
        src={article.author.image || prof}
        alt={article.author.username}
        onError={(event) => {
          event.currentTarget.onerror = null;
          event.currentTarget.src = prof;
        }}
      />

      <div className="author-info">
        <h4>{article.author.username}</h4>
        <p>{formatDate(article.createdAt)}</p>
      </div>
    </div>
  );
};

UserInfo.propTypes = {
  article: PropTypes.shape({
    createdAt: PropTypes.string.isRequired,
    author: PropTypes.shape({
      username: PropTypes.string.isRequired,
      image: PropTypes.string,
    }).isRequired,
  }).isRequired,
  formatDate: PropTypes.func.isRequired,
};

export default UserInfo;
