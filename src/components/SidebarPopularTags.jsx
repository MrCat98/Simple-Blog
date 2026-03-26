const Sidebar = ({ articles }) => {
const tags = [
    ...new Set(
      articles
        .flatMap((article) => article.tagList || [])
        .filter((tag) => tag && typeof tag === 'string')
    )
  ].slice(0, 5);

  return (
    <div className="sidebar__popular-tags">
      <h3>Popular tags</h3>

      <ul>
        {tags.filter(tag=>tag!==null).map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
