import prof from "../assets/Icon.svg";

const Userinfo = ({ article, formatDate }) => {
  return (
    <div className="UserInfo">
      <img className="profile-image" src={prof} alt={article.author.username} />

      <div className="author-info">
        <h4>{article.author.username}</h4>
        <p>{formatDate(article.createdAt)}</p>
      </div>
    </div>
  );
};

export default Userinfo;
