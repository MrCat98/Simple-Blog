

const banerArticle =({articleDescription,articleTitle}) => {

    return(
        <div className="banerArticle">
        <h3>{articleTitle}</h3>

        <p>{articleDescription}</p>
        </div>
    )
}

export default banerArticle;
