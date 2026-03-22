const Tags = ({ tags }) => {
  if (!tags?.length) return null;

  return (
    <ul className="tags">
      {tags.slice(0, 5).map(tag => (
        <li key={tag}>{tag}</li>
      ))}
    </ul>
  );
};

export default Tags