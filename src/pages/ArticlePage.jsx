import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Userinfo from "../components/UserInfo";
import Tags from "../components/Tag";
import LoadingArrow from "../assets/refresh.svg";
import { useAuth } from "../context/useAuth";

const ArticlePage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated, favoriteArticle, unfavoriteArticle, deleteArticle } = useAuth();
  const [article, setArticle] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

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

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteArticle(slug);
      navigate("/");
    } catch (err) {
      console.error(err);
      setIsDeleting(false);
    }
  };

  if (!article) {
    return (
      <div className="loading-wrapper">
        {" "}
        <img src={LoadingArrow} alt="Loading" /> <p>Loading...</p>
      </div>
    );
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
          {user?.username !== article.author.username && (
            <button
              className={`Favorite-Button${article.favorited ? " liked" : ""}`}
              onClick={toggleLike}>
              {article.favorited ? "Unfavorite article" : "Favorite article"} (
              {article.favoritesCount})
            </button>
          )}

          {isAuthenticated && user?.username === article.author.username && (
            <>
              <button
                type="button"
                className="Edit-Button"
                onClick={() => navigate(`/new-post/${slug}`)}>
                Edit article
              </button>
              <button
                type="button"
                className="Delete-Button"
                onClick={() => setIsDeleteModalOpen(true)}>
                Delete article
              </button>
            </>
          )}
        </section>
      </div>

      {isDeleteModalOpen && (
        <div className="delete-modal-overlay">
          <div className="delete-modal">
            <p>Удалить статью «{article.title}»?</p>
            <div className="delete-modal__actions">
              <button
                type="button"
                onClick={() => setIsDeleteModalOpen(false)}
                disabled={isDeleting}>
                Отмена
              </button>
              <button
                type="button"
                className="delete-modal__confirm"
                onClick={handleDelete}
                disabled={isDeleting}>
                {isDeleting ? "Удаляем…" : "Удалить"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArticlePage;
