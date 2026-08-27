import PropTypes from "prop-types";
import Input from "./Input";
import { FIELDS } from "./ArticleForm.fields";
import { messages } from "../validation/messages";

const COMMON_TAGS = [
  "react",
  "javascript",
  "webdev",
  "programming",
  "tutorial",
];

const ArticleForm = ({
  onSubmit,
  register,
  errors,
  isSubmitting,
  serverError,
  watch,
  setValue,
}) => {
  const selectedTags = watch("tags")
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);

  const toggleTag = (tag) => {
    const nextTags = selectedTags.includes(tag)
      ? selectedTags.filter((selected) => selected !== tag)
      : [...selectedTags, tag];
    setValue("tags", nextTags.join(", "), { shouldDirty: true });
  };

  return (
    <form className="new-post-form" onSubmit={onSubmit} noValidate>
      {serverError && (
        <p className="form-message form-message--error">{serverError}</p>
      )}

      {FIELDS.map(({ name, placeholder, rules }) => (
        <Input
          key={name}
          type="text"
          placeholder={placeholder}
          {...register(name, rules)}
          error={errors[name]?.message}
        />
      ))}

      <label>
        <textarea
          rows="8"
          placeholder="Input your text"
          {...register("body", { required: messages.articleBodyRequired })}
        />
        {errors.body && (
          <span className="field-error">{errors.body.message}</span>
        )}
      </label>

      <label>
        <span>Tags</span>
        <div className="tags-picker">
          {COMMON_TAGS.map((tag) => (
            <button
              key={tag}
              type="button"
              className={`tag-option${selectedTags.includes(tag) ? " tag-option--active" : ""}`}
              onClick={() => toggleTag(tag)}>
              {tag}
            </button>
          ))}
        </div>
        <input type="hidden" {...register("tags")} />
      </label>

      <button type="submit" disabled={isSubmitting} className="submit-button">
        {isSubmitting ? "Публикуем…" : "Publish Article"}
      </button>
    </form>
  );
};

ArticleForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  serverError: PropTypes.string,
  watch: PropTypes.func.isRequired,
  setValue: PropTypes.func.isRequired,
};

export default ArticleForm;
