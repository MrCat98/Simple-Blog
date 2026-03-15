const Tags = ({ articles = [] }) => {

  return (
    <ul>
        {Array.isArray(articles) &&
        articles.map((article) => (
          <li key={article.slug}>
            {article.tagList.map((tag, index) => (
              <span key={index}>{tag}</span>
            ))}
          </li>
        ))}
    </ul>
  );
};

export default Tags;