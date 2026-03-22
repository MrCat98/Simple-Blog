import { useLocation } from "react-router-dom";
import Navigation from "../components/NavbarFrame";
import Userinfo from "../components/Userinfo";

const ArticlePage =()=>{
    const location = useLocation()
    const article = location.state?.articleData
     return (
    <div className="homePage">
      <Navigation />
            <div className="content">
                <h1>{article?.title}</h1>
            </div>
    </div>
  );
}

export default ArticlePage