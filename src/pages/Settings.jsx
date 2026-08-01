import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const getApiError = (errors) => {
  if (!errors || typeof errors !== "object") {
    return "Не удалось сохранить изменения. Попробуйте ещё раз.";
  }

  return Object.entries(errors)
    .map(
      ([field, messages]) =>
        `${field}: ${Array.isArray(messages) ? messages.join(", ") : messages}`,
    )
    .join(". ");
};

const isValidImageUrl = (value) => {
  if (!value) return true;

  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
};

const SettingsPage = () => {
  const { updateUser, logout } = useAuth();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      image: "",
      username: "",
      bio: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async ({ image, username, bio, email, password }) => {
    setServerError("");
    setSuccessMessage("");

    const updatedUser = { image, username, bio, email };
    if (password) {
      updatedUser.password = password;
    }

    try {
      await updateUser(updatedUser);
      reset();
      setSuccessMessage("Настройки профиля сохранены.");
    } catch (apiErrors) {
      setServerError(getApiError(apiErrors));
    }
  };

  const handleLogoutClick = () => {
    logout();
    navigate("/signin");
  };

  return (
    <main className="settings-page">
      <form
        className="settings-form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        autoComplete="off">
        <h1>Настройки профиля</h1>

        {serverError && (
          <p className="form-message form-message--error">{serverError}</p>
        )}
        {successMessage && (
          <p className="form-message form-message--success">{successMessage}</p>
        )}

        <label>
          <input
            type="text"
            placeholder="Username"
            aria-label="Username"
            autoComplete="off"
            {...register("username", {
              validate: (value) =>
                value.trim().length > 0 ||
                "Имя пользователя не может быть пустым",
            })}
          />
          {errors.username && (
            <span className="field-error">{errors.username.message}</span>
          )}
        </label>
        <label>
          <input
            type="email"
            placeholder="Email Address"
            aria-label="Email Address"
            autoComplete="off"
            {...register("email", {
              required: "Укажите email",
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Введите корректный email",
              },
            })}
          />
          {errors.email && (
            <span className="field-error">{errors.email.message}</span>
          )}
        </label>

        <label>
          <textarea
            rows="4"
            placeholder="Input your comment"
            aria-label="Input your comment"
            autoComplete="off"
            {...register("bio")}
          />
        </label>

        <label>
          <input
            type="password"
            placeholder="New Password"
            aria-label="New Password"
            autoComplete="off"
            {...register("password", {
              minLength: {
                value: 6,
                message: "Пароль должен содержать минимум 6 символов",
              },
              maxLength: {
                value: 40,
                message: "Пароль должен содержать максимум 40 символов",
              },
            })}
          />
          {errors.password && (
            <span className="field-error">{errors.password.message}</span>
          )}
        </label>
        <label>
          <input
            type="url"
            placeholder="URL of profile picture"
            aria-label="URL of profile picture"
            autoComplete="off"
            {...register("image", {
              validate: (value) =>
                isValidImageUrl(value) || "Введите корректный URL изображения",
            })}
          />
          {errors.image && (
            <span className="field-error">{errors.image.message}</span>
          )}
        </label>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Сохраняем…" : "Сохранить изменения"}
        </button>
        <button type="button" className="logout-button" onClick={handleLogoutClick}>
          Logout
        </button>
      </form>
    </main>
  );
};

export default SettingsPage;
