const Sidebar = ({ articles }) => {

  const tags = articles
    .flatMap(article => article.tagList)
    .slice(0, 5);

  return (
    <div className="sidebar__popular-tags">
      <h3>Popular tags</h3>

      <ul>
        {tags.map(tag => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>

    </div>
  );
};

export default Sidebar;
