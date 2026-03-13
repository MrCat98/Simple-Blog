import prof from "../assets/prof.svg";
import PropTypes from "prop-types";

const BannerUserinfo = () => {

  return (
    <div className="BannerUserinfo">
      <img src={prof} alt="profile" />

      <div className="text-wrapper">
        <h3 className="username">Username</h3>
        <p className="date">Дата публикации</p>
      </div>
    </div>
  );
};

export default BannerUserinfo;
