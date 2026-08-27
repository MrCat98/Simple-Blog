import { useForm, useWatch } from "react-hook-form";
import { useAuth } from "../context/useAuth";
import { registerUser } from "../context/api";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import { getSignUpFields } from "../context/SignUpPage.fields";

function SignUpPage() {
  const {
    register,
    handleSubmit,
    setError,
    control,
    formState: { errors },
  } = useForm();
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const password = useWatch({ control, name: "password" });
  const fields = getSignUpFields(password);

  const onSubmit = async (data) => {
    try {
      // data содержит username, email, password из полей формы
      const registeredUser = await registerUser(
        data.username,
        data.email,
        data.password,
      );
      setUser(registeredUser);
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
        {fields.map(({ name, type, placeholder, rules }) => (
          <Input
            key={name}
            type={type}
            placeholder={placeholder}
            {...register(name, rules)}
            error={errors[name]?.message}
          />
        ))}
        <div className="signup--button--wrapper">
          <button type="submit">Sign Up</button>
        </div>
      </form>
    </div>
  );
}

export default SignUpPage;
