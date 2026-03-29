import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/Settings";
import NotFountPage from "./pages/NotFountPage";
import ArticlePage from "./pages/ArticlePage";
import MainLayout from "./Layouts/MainLayout";
import SignUp from "./pages/SignUpPage";
import SignIn from "./pages/SignInPage";
import NewPostPage from "./pages/WriteArticle";
import ProtectedRoute from "./components/ProtectedRoute";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {AuthProvider} from "./context/AuthContext";
import { useState } from "react";

const App = () => {
  const [log, setLog] = useState(false);

  const handleLogin =()=> {
    setLog(true)
  }
  const handleLogout=()=>{
    setLog(false)
  }
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/articlepage/:slug" element={<ArticlePage />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn handleLogin={handleLogin}/>} />
            <Route element={<ProtectedRoute isLoggedIn={log} />}>
              <Route path="settings" element={<SettingsPage />} />
              <Route path="profile" element={<ProfilePage handleLogout={handleLogout}/>} />
              <Route path="new-post" element={<NewPostPage />} />
            </Route>{" "}
          </Route>
          <Route path="*" element={<NotFountPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
