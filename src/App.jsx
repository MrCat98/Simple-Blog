import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/Settings";
import NotFountPage from "./pages/NotFountPage";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PropTypes from "prop-types";
import Tags from "./components/Tag";


const App = () => { 
  
  
  const [articles, setArticles] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [likes, setLikes] = useState(0);
    useEffect(()=>{
      const fetchUsers = async () => {
        try{
          const response = await fetch("https://realworld.habsida.net/api/articles")
        

        if(!response.ok){
          throw new Error("Ошибка " + response.status)
        }

        const data = await response.json();
        setArticles(data.articles)
        console.log(data.articles
        )
      }
      
      catch(err){
        setError(err.message)
      }

      finally{
        setLoading(false)
      }
    }
      
      fetchUsers();
    }, [])

    if (loading) return<h1>Загрузка</h1>
    if (error) return <h1>Ошибка: {error}</h1>

 

  function plus() {
    setLikes(likes + 1);
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
