const Tags = ({ tags }) => {
  if (!tags?.length) return null;

  return (
    <ul className="tags">
      {tags.filter(tag=>tag!==null).map((tag) => (
        <li key={tag}>{tag}</li>
      ))}
    </ul>
  );
};

export default Tags;
