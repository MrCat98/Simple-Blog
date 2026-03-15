const Tags = ({ articles = [] }) => {

  const tagCount = {};

  articles.forEach(article => {
    article.tagList.forEach(tag => {
      tagCount[tag] = (tagCount[tag] || 0) + 1;
    });
  });

  const topTags = Object.entries(tagCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  return (
    <ul className="tags">
      {topTags.map(([tag]) => (
        <li key={tag}>{tag}</li>
      ))}
    </ul>
  );
};

export default Tags;
