import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Userinfo from "../components/UserInfo";
import Tags from "../components/Tag";
import LoadingArrow from "../assets/refresh.svg"
import { useAuth } from "../context/useAuth";

const ArticlePage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, favoriteArticle, unfavoriteArticle } = useAuth();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await fetch(
          `https://realworld.habsida.net/api/articles/${slug}`,
        );

        if (!res.ok) {
          throw new Error("Ошибка " + res.status);
        }

        const data = await res.json();
        console.log(data);
        setArticle(data.article);
      } catch (err) {
        console.error(err);
      }
    };

    fetchArticle();
  }, [slug]);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const toggleLike = async () => {
    if (!isAuthenticated) {
      navigate("/signin");
      return;
    }

    try {
      const updated = article.favorited
        ? await unfavoriteArticle(slug)
        : await favoriteArticle(slug);
      setArticle((prev) => ({
        ...prev,
        favorited: updated.favorited,
        favoritesCount: updated.favoritesCount,
      }));
    } catch (err) {
      console.error(err);
    }
  };

  if (!article) {
    return <div className="loading-wrapper"> <img src={LoadingArrow} alt="Loading"/> <p>Loading...</p></div>;
  }

  return (
    <div className="Article-Page">
      <div className="Article-wrapper">
        <header className="Article__header">
          <h1>{article.title}</h1>
          <Userinfo article={article} formatDate={formatDate} />
        </header>
      </div>
      <div className="Article__Page--content--container">
        <p className="Article__text--content">{article.body}</p>
        <Tags tags={article.tagList} />
        <section className="Article__User--Submit">
          <Userinfo article={article} formatDate={formatDate} />
          <button
            className={`Favorite-Button${article.favorited ? " liked" : ""}`}
            onClick={toggleLike}
          >
            {article.favorited ? "Unfavorite article" : "Favorite article"} ({article.favoritesCount})
          </button>
        </section>
      </div>
    </div>
  );
};

export default ArticlePage;
