import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/Settings";
import NotFountPage from "./pages/NotFountPage";
import ArticlePage from "./pages/ArticlePage"
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/postpage/:slug" element={<ArticlePage/>}/>
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="*" element={<NotFountPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
