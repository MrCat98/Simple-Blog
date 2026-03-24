import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/Settings";
import NotFountPage from "./pages/NotFountPage";
import ArticlePage from "./pages/ArticlePage";
import MainLayout from "./Layouts/MainLayout";

import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/articlepage/:slug" element={<ArticlePage />} />
        </Route>
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="*" element={<NotFountPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
