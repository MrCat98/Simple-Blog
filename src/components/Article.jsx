import {Link} from "react-router-dom"

const BannerArticle =({articleDescription,articleTitle,article}) => {
        
    return(
        <div className="Article">
        <Link to={`/articlepage/${article.slug}`}>
        <h3>{articleTitle}</h3>
        </Link>
        <p>{articleDescription}</p>
        </div>
    )
}

export default BannerArticle;
