import {Link} from "react-router-dom"

const banerArticle =({articleDescription,articleTitle,article}) => {

    return(
        <div className="Article">
        <Link to={`/postpage/${article.slug}`} state={{articleData:article}}>
        <h3>{articleTitle}</h3>
        </Link>
        <p>{articleDescription}</p>
        </div>
    )
}

export default banerArticle;
