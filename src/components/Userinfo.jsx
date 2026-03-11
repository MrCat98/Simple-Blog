import prof from "../assets/prof.svg";
import PropTypes from "prop-types";


const bannerUserinfo =() => {
    return (
        <div className="bannerUserinfo">
            <img src={prof} alt="profile" />
            <div className="text-wrapper">
                <h2>Это заголовок информации о пользователе</h2>
                <p>Это описание информации о пользователе</p>
            </div>
        </div>
    )
}

bannerUserinfo.propTypes = {
    
}

export default bannerUserinfo;