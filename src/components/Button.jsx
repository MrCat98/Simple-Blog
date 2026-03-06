const Button =({handleClick, count}) => {
    return(
        <button className="button" onClick={handleClick}>
            Like {count}
        </button>
    )
}

export default Button;