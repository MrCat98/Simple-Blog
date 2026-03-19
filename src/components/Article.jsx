

const banerArticle =({articleDescription,articleTitle}) => {

    return(
        <div className="Article">
        <h3>{articleTitle}</h3>

        <p>{articleDescription}</p>
        </div>
    )
}

export default banerArticle;
