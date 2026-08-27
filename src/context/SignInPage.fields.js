import { messages } from "../validation/messages";

export const signInFields = [
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "Email",
    autoComplete: "email",
    rules: {
      required: messages.emailRequired,
      pattern: {
        value: /^\S+@\S+\.\S+$/,
        message: messages.emailInvalid,
      },
    },
  },
  {
    name: "password",
    label: "Пароль",
    type: "password",
    placeholder: "Password",
    autoComplete: "current-password",
    rules: { required: messages.passwordRequired },
  },
];
