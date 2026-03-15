
import PropTypes from "prop-types";


const BannerUserinfo = ({articles=[]}) => {

  return (
     <div>
      {articles[0]?.author.username}
    </div>
  );
};

export default BannerUserinfo;
