import prof from '../assets/prof.svg'


const Userinfo = ({ article,formatDate }) => {
  return (
    <div className="Userinfo">
      <img
        className='profile-image'
        src={prof}
        alt={article.author.username}
      />

      <div className="author-info">
        <h4>{article.author.username}</h4>
        <p>{formatDate(article.createdAt)}</p>
      </div>
    </div>
  );
};

export default Userinfo;
