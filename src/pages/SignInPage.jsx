import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

const SignIn = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: { email: "", password: "" } });

  const onSubmit = async ({ email, password }) => {
    try {
      await login(email, password);
      navigate("/");
    } catch (apiErrors) {
      console.error("Login error:", apiErrors);
      setError("root", {
        type: "server",
        message: "Неверный email или пароль.",
      });
    }
  };

  return (
    <div className="signin-form--wrapper">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="signin--form"
        noValidate>
        <h1>Sign In</h1>
        {errors.root && (
          <p className="form-message form-message--error">
            {errors.root.message}
          </p>
        )}

        <label>
          Email
          <input
            type="email"
            placeholder="Email"
            autoComplete="email"
            {...register("email", {
              required: "Введите email",
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
          Пароль
          <input
            type="password"
            placeholder="Password"
            autoComplete="current-password"
            {...register("password", { required: "Введите пароль" })}
          />
          {errors.password && (
            <span className="field-error">{errors.password.message}</span>
          )}
        </label>

        <div className="signin--button--wrapper">
          <button
            type="submit"
            className="signIn--button"
            disabled={isSubmitting}>
            {isSubmitting ? "Входим…" : "Sign In"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
