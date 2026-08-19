import PropTypes from "prop-types";
import Tags from "./Tag";
import UserInfo from "./UserInfo";
import Button from "./Button";
import Article from "./Article";
import { useAuth } from "../context/useAuth";

const PostList = ({ onToggleLike, articles, formatDate }) => {
  const { user } = useAuth();

  return (
    <ul className="postList">
      {articles.map((article) => (
        <li key={article.slug} className="post">
          <div className="postHeading">
            <UserInfo article={article} formatDate={formatDate} />

            {user?.username !== article.author.username && (
              <Button
                onClick={() => onToggleLike(article.slug)}
                likes={article.favoritesCount || 0}
                liked={article.favorited}
              />
            )}
          </div>

          <article className="postContent">
            <Article
              articleTitle={article.title}
              articleDescription={article.description}
              article={article}
            />
            <Tags tags={article.tagList} />
          </article>
        </li>
      ))}
    </ul>
  );
};

PostList.propTypes = {
  onToggleLike: PropTypes.func.isRequired,
  articles: PropTypes.arrayOf(
    PropTypes.shape({
      slug: PropTypes.string.isRequired,
      favoritesCount: PropTypes.number,
      favorited: PropTypes.bool,
      title: PropTypes.string,
      description: PropTypes.string,
      tagList: PropTypes.arrayOf(PropTypes.string),
      author: PropTypes.shape({
        username: PropTypes.string.isRequired,
      }).isRequired,
    }),
  ).isRequired,
  formatDate: PropTypes.func.isRequired,
};

export default PostList;
