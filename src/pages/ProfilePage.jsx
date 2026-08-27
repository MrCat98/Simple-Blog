import { useEffect, useState } from "react";
import { useAuth } from "../context/useAuth";
import { favoriteArticle, unfavoriteArticle } from "../validation/api";
import profileIcon from "../assets/user.svg";
import PostList from "../components/PostList";

const ProfilePage = () => {
  const { user, isAuthenticated } = useAuth();
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    if (!user?.username) return;

    const fetchOwnArticles = async () => {
      try {
        const response = await fetch(
          `https://realworld.habsida.net/api/articles?author=${user.username}&limit=5`,
        );
        if (!response.ok) return;
        const data = await response.json();
        setArticles(data.articles);
      } catch (err) {
        console.error(err);
      }
    };

    fetchOwnArticles();
  }, [user?.username]);

  const toggleLike = async (slug) => {
    if (!isAuthenticated) return;

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
    <>
      <div className="profile-page--wrapper">
        <img
          className="profile-page__avatar"
          src={user?.image || profileIcon}
          alt={
            user?.username ? `Аватар ${user.username}` : "Аватар пользователя"
          }
          onError={(event) => {
            event.currentTarget.onerror = null;
            event.currentTarget.src = profileIcon;
          }}
        />
        <h1>{user?.username}</h1>
      </div>
      {articles.length > 0 && (
        <PostList onToggleLike={toggleLike} articles={articles} />
      )}
    </>
  );
};

export default ProfilePage;
