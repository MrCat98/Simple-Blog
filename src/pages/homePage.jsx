import PostList from "../components/Post";
import PaginationBar from "../components/PaginationBar";
import Navigation from "../components/NavbarFrame";
import Default from "../components/Default";
import Sidebar from "../components/SidebarPopularTags";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Outlet, Link } from "react-router-dom";
import LoadingArrow from "../assets/refresh.svg"


const HomePage = () => {
  const [likes, setLikes] = useState({});
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const perPage = 10;

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const offset = (page - 1) * perPage + 10;
        const response = await fetch(
          `https://realworld.habsida.net/api/articles/?limit=${perPage}&offset=${offset}`,
        );
        if (!response.ok) {
          throw new Error("Ошибка " + response.status);
        }

        const data = await response.json();
        setArticles(data.articles);
        setTotalPages(Math.ceil(data.articlesCount / perPage));
        console.log(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [page]);

  console.log(articles.tagList);

  if (loading) return <div className="loading-wrapper"> <img src={LoadingArrow} alt="Loading"/> <p>Loading...</p></div>;
  if (error) return <h1>Ошибка: {error}</h1>;

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  function plus(slug) {
    setLikes((prev) => ({
      ...prev,
      [slug]: (prev[slug] || 0) + 1,
    }));
    console.log(likes);
  }

  return (
    <div className="homePage">
      <Default />
      <Sidebar articles={articles} />
      <div className="content">
        <PostList
          handleClick={plus}
          likes={likes}
          articles={articles}
          formatDate={formatDate}
        />
        <PaginationBar
          articles={articles}
          page={page}
          setPage={setPage}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
};

HomePage.propTypes = {
  handleClick: PropTypes.func.isRequired,
  likes: PropTypes.number.isRequired,
};
export default HomePage;
