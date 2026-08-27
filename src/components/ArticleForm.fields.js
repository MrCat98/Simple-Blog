import { messages } from "../validation/messages";

export const FIELDS = [
  {
    name: "title",
    placeholder: "Title",
    rules: { required: messages.articleTitleRequired },
  },
  {
    name: "description",
    placeholder: "Short description",
    rules: { required: messages.articleDescriptionRequired },
  },
];
