
import HomePage from "./pages/HomePage";
// import ArticlePage from "./pages/ArticlePage";
// import ProfilePage from "./pages/ProfilePage";
// import PageSettings from "./pages/Settings";
// import SingInPage from "./pages/SingInPage";
// import SingUpPage from "./pages/SingUpPage";
// import WriteArticle from "./pages/WriteArticle";
import { useState } from "react";

import {BrowserRouter,Routes,Route} from 'react-router-dom'


const App =()=>{
  
  const[likes ,setCount] = useState(0)

  function handleClick(){
    setCount(likes + 1)
  }

  return(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage 
          handleClick={handleClick}
          likes={likes}
          />} />
          {/* <Route path="/article" element={<ArticlePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/settings" element={<PageSettings />} />
          <Route path="/signin" element={<SingInPage />} />
          <Route path="/signup" element={<SingUpPage />} />
          <Route path="/write" element={<WriteArticle />} /> */}
        </Routes>
      </BrowserRouter>
  )
}

export default App