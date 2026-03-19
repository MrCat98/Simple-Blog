import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/Settings";
import NotFountPage from "./pages/NotFountPage";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";


const App = () => { 
  
      const [likes, setLikes] = useState({});

  const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage]=useState(1)
    const perPage = 3

    useEffect(()=>{
      const fetchPost = async () => {
        try{
          const offset = (page - 1) * perPage
          const response = await fetch(`https://realworld.habsida.net/api/articles/?limit=${perPage}&offset=${offset}`)
        if(!response.ok){
          throw new Error("Ошибка " + response.status)
        }

        const data = await response.json();
        setArticles(data.articles)
        console.log(data)
      }
      
      catch(err){
        setError(err.message)
      }

      finally{
        setLoading(false)
      }
    }
      
      fetchPost();
    }, [page])

    if (loading) return<h1>Загрузка</h1>
    if (error) return <h1>Ошибка: {error}</h1>


  function plus(slug) {
    setLikes(prev => ({
      ...prev,[slug]:(prev[slug]|| 0) +1
    }));
    console.log(likes);
  }


  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              handleClick={plus}
              likes={likes}
              articles={articles}
            />
          }
        />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="*" element={<NotFountPage />} />
      </Routes>


    </BrowserRouter>
  );
};

export default App;
