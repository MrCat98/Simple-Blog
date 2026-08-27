import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { updateUser } from "../context/api";
import Input from "../components/Input";
import { topFields, bottomFields } from "../context/Settings.fields";

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

const toFormValues = (user) => ({
  image: user?.image,
  username: user?.username,
  bio: user?.bio,
  email: user?.email,
  password: undefined,
});

const SettingsPage = () => {
  const { user, setUser, logout } = useAuth();
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

  useEffect(() => {
    reset(toFormValues(user));
  }, [user, reset]);

  const onSubmit = async ({ image, username, bio, email, password }) => {
    setServerError("");
    setSuccessMessage("");

    const updatedUser = { image, username, bio, email };
    if (password) {
      updatedUser.password = password;
    }

    try {
      const savedUser = await updateUser(updatedUser);
      setUser(savedUser);
      reset(toFormValues(savedUser));
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

        {topFields.map(({ name, type, placeholder, ariaLabel, rules }) => (
          <Input
            key={name}
            type={type}
            placeholder={placeholder}
            aria-label={ariaLabel}
            autoComplete="off"
            {...register(name, rules)}
            error={errors[name]?.message}
          />
        ))}

        <label>
          <textarea
            rows="4"
            placeholder="Input your comment"
            aria-label="Input your comment"
            autoComplete="off"
            {...register("bio")}
          />
        </label>

        {bottomFields.map(({ name, type, placeholder, ariaLabel, rules }) => (
          <Input
            key={name}
            type={type}
            placeholder={placeholder}
            aria-label={ariaLabel}
            autoComplete="off"
            {...register(name, rules)}
            error={errors[name]?.message}
          />
        ))}

        <button type="submit" disabled={isSubmitting} className="save-button">
          {isSubmitting ? "Сохраняем…" : "Update"}
        </button>
        <button
          type="button"
          className="logout-button"
          onClick={handleLogoutClick}>
          Logout
        </button>
      </form>
    </main>
  );
};

export default SettingsPage;
