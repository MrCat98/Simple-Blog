import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext"; // Импорт хука
import { useNavigate } from "react-router-dom";

function SignUpPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const { registerUser } = useAuth(); // Достаем функцию из контекста
  const navigate = useNavigate();

  const password = watch("password");

  const onSubmit = async (data) => {
    try {
      // data содержит username, email, password из полей формы
      await registerUser(data.username, data.email, data.password);
      navigate("/"); // Уводим на главную после успеха
    } catch (errors) {
      console.error("Ошибка регистрации:", errors);
      alert("Ошибка: " + JSON.stringify(errors));
    }
  };

  return (
    <div className="signup-form--wrapper">
      <form onSubmit={handleSubmit(onSubmit)} className="signup--form">
        <h1>Sign Up</h1>
        <input
          {...register("username", { required: true })}
          placeholder="UserName"
          type="text"
        />
        <input
          {...register("email", { required: true })}
          type="email"
          placeholder="Email address"
        />
        <input
          {...register("password", {
            required: "Введите пароль",
            minLength: { value: 6, message: "Минимум 6 символов" },
          })}
          type="password"
          placeholder="Password"
        />
        {errors.password && (
          <p style={{ color: "red" }}>{errors.password.message}</p>
        )}

        {/* Подтверждение пароля */}
        <input
          {...register("confirmPassword", {
            required: "Подтвердите пароль",
            validate: (value) => value === password || "Пароли не совпадают",
          })}
          type="password"
          placeholder="Repeat Password"
        />
        {errors.confirmPassword && (
          <p style={{ color: "red" }}>{errors.confirmPassword.message}</p>
        )}
        <div className="signup--button--wrapper">
          <button type="submit">Sign Up</button>
        </div>
      </form>
    </div>
  );
}

export default SignUpPage;
