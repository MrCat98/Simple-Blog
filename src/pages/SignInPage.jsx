import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Импортируем наш хук

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();
  const { login } = useAuth(); // Достаем функцию login из контекста

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      // Вызываем login из контекста (он сам сходит в API и сохранит токен)
      await login(email, password); 
      navigate("/"); // Если всё ок — на главную
    } catch (err) {
      // Если API вернуло ошибку (например, 422 или 401)
      setError("Неверный email или пароль");
      console.error("Login error:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Sign In</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      
      <input 
        type="email" 
        placeholder="Email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        required 
      />
      <input 
        type="password" 
        placeholder="Password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        required 
      />
      
      <button type="submit">Sign In</button>
    </form>
  );
};

export default SignIn;
