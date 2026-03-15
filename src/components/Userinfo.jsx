
import PropTypes from "prop-types";


const BannerUserinfo = ({articles=[]}) => {

  return (
    <ul>
      {Array.isArray(articles)&&
      articles.map((article) => (
        <li key={article.slug}>
          {article.author.username}
        </li>
      ))}
    </ul>
  );
};

export default BannerUserinfo;
