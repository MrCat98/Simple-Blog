import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Userinfo from "../components/UserInfo";
import Tags from "../components/Tag";

const ArticlePage = () => {
  const { slug } = useParams();
  console.log("slug", slug);
  const [article, setArticle] = useState(null);
  console.log(article);

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

  if (!article) {
    return <div>Загрузка...</div>;
  }

  return (
    <div className="Article-Page">
      <header className="Article__header--wrapper">
        <div>
          <h1>{article.title}</h1>
          <Userinfo article={article} formatDate={formatDate} />
        </div>
      </header>
      <div className="Article__Page--content--container">
        <p>{article.body}</p>
        <Tags tags={article.tagList} />
        <section className="Article__User--Submit">
          <Userinfo article={article} formatDate={formatDate} />
          <button className="Favorite-Button">Favorite article</button>
        </section>
      </div>
    </div>
  );
};

export default ArticlePage;
