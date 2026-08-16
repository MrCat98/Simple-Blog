import Tags from "./Tag";
import Userinfo from "./UserInfo";
import Button from "./Button";
import Article from "./Article";

const PostList = ({ handleClick, articles, formatDate }) => {
  return (
    <ul className="postList">
      {articles.map((article) => (
        <li key={article.slug} className="post">
          <div className="postHeading">
            <Userinfo article={article} formatDate={formatDate} />

            <Button
              onHandleClick={() => handleClick(article.slug)}
              likes={article.favoritesCount || 0}
              liked={article.favorited}
            />
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

export default PostList;
