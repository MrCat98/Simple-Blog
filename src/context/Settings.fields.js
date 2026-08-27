import { messages } from "../validation/messages";

export const isValidImageUrl = (value) => {
  if (!value) return true;

  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
};

export const topFields = [
  {
    name: "username",
    type: "text",
    placeholder: "Username",
    ariaLabel: "Username",
    rules: {
      required: messages.usernameRequired,
      minLength: { value: 3, message: messages.usernameLength },
      maxLength: { value: 20, message: messages.usernameLength },
    },
  },
  {
    name: "email",
    type: "email",
    placeholder: "Email Address",
    ariaLabel: "Email Address",
    rules: {
      required: messages.emailRequiredSettings,
      pattern: {
        value: /^\S+@\S+\.\S+$/,
        message: messages.emailInvalid,
      },
    },
  },
];

export const bottomFields = [
  {
    name: "image",
    type: "url",
    placeholder: "Avatar image (URL)",
    ariaLabel: "Avatar image (URL)",
    rules: {
      validate: (value) => isValidImageUrl(value) || messages.imageUrlInvalid,
    },
  },
  {
    name: "password",
    type: "password",
    placeholder: "New Password",
    ariaLabel: "New Password",
    rules: {
      minLength: {
        value: 6,
        message: messages.passwordMinSettings,
      },
      maxLength: {
        value: 40,
        message: messages.passwordMaxSettings,
      },
    },
  },
];
