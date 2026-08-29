import { useState } from "react";
import PropTypes from "prop-types";
import like from "../assets/like.svg";

const Button = ({ onClick, likes, liked = false }) => {
  const [isBlinking, setIsBlinking] = useState(false);

  const handleClick = (event) => {
    setIsBlinking(true);
    onClick(event);
  };

  return (
    <button
      type="button"
      className={`Likes-button${isBlinking ? " blink" : ""}`}
      onClick={handleClick}
      onAnimationEnd={() => setIsBlinking(false)}
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
