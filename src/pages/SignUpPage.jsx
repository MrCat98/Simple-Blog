import { useForm, useWatch } from "react-hook-form";
import { useAuth } from "../context/useAuth"; // Импорт хука
import { useNavigate } from "react-router-dom";

function SignUpPage() {
  const passwordLengthError = "Минимум 6, максимум 20 символов";
  const usernameLengthError = "Минимум 3,максимум 20 символов";

  const {
    register,
    handleSubmit,
    setError,
    control,
    formState: { errors },
  } = useForm();
  const { registerUser } = useAuth(); // Достаем функцию из контекста
  const navigate = useNavigate();

  const password = useWatch({ control, name: "password" });

  const onSubmit = async (data) => {
    try {
      // data содержит username, email, password из полей формы
      await registerUser(data.username, data.email, data.password);
      navigate("/"); // Уводим на главную после успеха
    } catch (apiErrors) {
      console.error("Ошибка регистрации:", apiErrors);

      Object.entries(apiErrors || {}).forEach(([field, messages]) => {
        const apiMessage = Array.isArray(messages)
          ? messages.join(", ")
          : messages;
        const message =
          ["username", "email"].includes(field) &&
          /taken|exists|already/i.test(apiMessage)
            ? "Такой пользователь уже существует"
            : apiMessage;
        if (["username", "email", "password"].includes(field)) {
          setError(field, { type: "server", message });
        }
      });
    }
  };

  return (
    <div className="signup-form--wrapper">
      <form onSubmit={handleSubmit(onSubmit)} className="signup--form">
        <h1>Sign Up</h1>
        <input
          {...register("username", {
            required: "Введите имя пользователя",
            minLength: { value: 3, message: usernameLengthError },
            maxLength: { value: 20, message: usernameLengthError },
          })}
          placeholder="UserName"
          type="text"
        />
        {errors.username && (
          <p style={{ color: "red" }}>{errors.username.message}</p>
        )}
        <input
          {...register("email", {
            required: "Введите email",
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: "Введите корректный email",
            },
          })}
          type="email"
          placeholder="Email address"
        />
        {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}
        <input
          {...register("password", {
            required: "Введите пароль",
            minLength: { value: 6, message: passwordLengthError },
            maxLength: { value: 20, message: passwordLengthError },
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
