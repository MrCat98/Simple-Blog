import PropTypes from "prop-types";
import like from "../assets/like.svg";

const Button = ({ onHandleClick, likes, liked = false }) => {
  return (
    <button
      type="button"
      className={`Likes-button${liked ? " liked" : ""}`}
      onClick={onHandleClick}
      aria-pressed={liked}
    >
      <img src={like} alt="like" />
      {likes}
    </button>
  );
};

Button.propTypes = {
  onHandleClick: PropTypes.func.isRequired,
  likes: PropTypes.number.isRequired,
  liked: PropTypes.bool,
};

export default Button;
