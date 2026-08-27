import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import Input from "../components/Input";
import { signInFields } from "../context/SignInPage.fields";

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

        {signInFields.map(({ name, label, type, placeholder, autoComplete, rules }) => (
          <Input
            key={name}
            label={label}
            type={type}
            placeholder={placeholder}
            autoComplete={autoComplete}
            {...register(name, rules)}
            error={errors[name]?.message}
          />
        ))}

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
