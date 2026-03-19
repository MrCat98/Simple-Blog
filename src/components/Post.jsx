import Tags from "./Tag";
import Userinfo from "./Userinfo";
import Button from "./Button";
import Article from "./Article";

const PostList = ({ handleClick, likes, articles = [] }) => {
        

  return (
    <ul className="postList">

      {articles.map(article => (
        <li key={article.slug} className="post">

          <div className="postHeading">
            <Userinfo article={article} />

            <Button
              onHandleClick={() => handleClick(article.slug)}
  likes={likes[article.slug] || 0}
            />
          </div>

          <div className="postContent">

          <Article
          articleTitle ={article.title}
          articleDescription={article.description}
          />

            <Tags tags={article.tagList} />
          </div>

        </li>
      ))}

    </ul>
  );
};

export default PostList;
