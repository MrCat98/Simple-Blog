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
import { AuthProvider } from "./context/AuthContext";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/articlepage/:slug" element={<ArticlePage />} />
            <Route path="/signup" element={<SignUp />} />
            <Route
              path="/signin"
              element={<SignIn />}
            />
            <Route element={<ProtectedRoute />}>
              <Route path="settings" element={<SettingsPage />} />
              <Route
                path="profile"
                element={<ProfilePage  />}
              />
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
