import { useParams } from "react-router-dom";
import { useEffect,useState } from "react";

const ArticlePage = () => {
  const { slug } = useParams();
  console.log('slug',slug)
  const [article,setArticle] = useState(null)
console.log(article)

  useEffect(() => {
  const fetchArticle = async () => {
    try {
      const res = await fetch(
        `https://realworld.habsida.net/api/articles/${slug}`
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

if(!article){
  return <div>Загрузка...</div>
}
  return (
    <>
    <h1>{article.title}</h1>
    </>
  )
};

export default ArticlePage;
