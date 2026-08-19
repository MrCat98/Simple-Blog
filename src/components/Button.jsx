import PropTypes from "prop-types";
import like from "../assets/like.svg";

const Button = ({ onClick, likes, liked = false }) => {
  return (
    <button
      type="button"
      className={`Likes-button${liked ? " liked" : ""}`}
      onClick={onClick}
      aria-pressed={liked}>
      <img src={like} alt="like" />
      {likes}
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  likes: PropTypes.number.isRequired,
  liked: PropTypes.bool,
};

export default Button;
