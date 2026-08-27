import { messages } from "../validation/messages";

export const getSignUpFields = (password) => [
  {
    name: "username",
    type: "text",
    placeholder: "UserName",
    rules: {
      required: messages.usernameRequired,
      minLength: { value: 3, message: messages.usernameLength },
      maxLength: { value: 20, message: messages.usernameLength },
    },
  },
  {
    name: "email",
    type: "email",
    placeholder: "Email address",
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
    type: "password",
    placeholder: "Password",
    rules: {
      required: messages.passwordRequired,
      minLength: { value: 6, message: messages.passwordLengthSignUp },
      maxLength: { value: 20, message: messages.passwordLengthSignUp },
    },
  },
  {
    name: "confirmPassword",
    type: "password",
    placeholder: "Repeat Password",
    rules: {
      required: messages.confirmPasswordRequired,
      validate: (value) => value === password || messages.passwordMismatch,
    },
  },
];
