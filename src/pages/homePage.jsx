import PostList from "../components/PostList";
import PaginationBar from "../components/PaginationBar";
import Default from "../components/Default";
import SidebarPopularTags from "../components/SidebarPopularTags";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import LoadingArrow from "../assets/refresh.svg";

const HomePage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, favoriteArticle, unfavoriteArticle } = useAuth();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const perPage = 10;

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const offset = (page - 1) * perPage;
        const response = await fetch(
          `https://realworld.habsida.net/api/articles/?limit=${perPage}&offset=${offset}`,
        );
        if (!response.ok) {
          throw new Error("Ошибка " + response.status);
        }

        const data = await response.json();
        setArticles(data.articles);
        setTotalPages(Math.ceil(data.articlesCount / perPage));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [page]);

  if (loading)
    return (
      <div className="loading-wrapper">
        {" "}
        <img src={LoadingArrow} alt="Loading" /> <p>Loading...</p>
      </div>
    );
  if (error) return <h1>Ошибка: {error}</h1>;

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const toggleLike = async (slug) => {
    if (!isAuthenticated) {
      navigate("/signin");
      return;
    }

    const target = articles.find((article) => article.slug === slug);
    if (!target) return;

    try {
      const updated = target.favorited
        ? await unfavoriteArticle(slug)
        : await favoriteArticle(slug);

      setArticles((prev) =>
        prev.map((article) =>
          article.slug === slug
            ? {
                ...article,
                favorited: updated.favorited,
                favoritesCount: updated.favoritesCount,
              }
            : article,
        ),
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="homePage">
      <Default />
      <SidebarPopularTags articles={articles} />
      <div className="content">
        <PostList
          onToggleLike={toggleLike}
          articles={articles}
          formatDate={formatDate}
        />
        <PaginationBar page={page} setPage={setPage} totalPages={totalPages} />
      </div>
    </div>
  );
};

export default HomePage;
