import PropTypes from "prop-types";

const Tags = ({ tags }) => {
  if (!tags?.length) return null;

  return (
    <ul className="tags">
      {tags
        .filter((tag) => tag !== null)
        .map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
    </ul>
  );
};

Tags.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string),
};

export default Tags;
