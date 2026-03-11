import PropTypes from "prop-types";
import like from "../assets/like.svg";

const Button =({onHandleClick, likes, }) => {
    return(
        <button className="Likes-button" 
        onClick={onHandleClick}>
            <img src={like} alt="like" />
        {likes}
        </button>
    )
}

Button.propTypes = {
    onHandleClick: PropTypes.func.isRequired,
    likes:PropTypes.number.isRequired,
    onDoubleClick: PropTypes.func.isRequired
}

export default Button;