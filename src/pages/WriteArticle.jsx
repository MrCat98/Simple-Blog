import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import ArticleForm from "../components/ArticleForm";

const getApiError = (errors) => {
  if (!errors || typeof errors !== "object") {
    return "Не удалось опубликовать статью. Попробуйте ещё раз.";
  }

  const message = Object.entries(errors)
    .map(
      ([field, messages]) =>
        `${field}: ${Array.isArray(messages) ? messages.join(", ") : messages}`,
    )
    .join(". ");

  if (message.includes("UNIQUE constraint failed: articles.slug")) {
    return "Статья с таким заголовком уже существует. Попробуйте изменить заголовок.";
  }

  return message;
};

const NewPostPage = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const isEditing = Boolean(slug);
  const { createArticle, updateArticle } = useAuth();
  const [serverError, setServerError] = useState("");
  const [isLoadingArticle, setIsLoadingArticle] = useState(isEditing);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { title: "", description: "", body: "", tags: "" },
  });

  useEffect(() => {
    if (!isEditing) return;

    const fetchArticle = async () => {
      try {
        const res = await fetch(
          `https://realworld.habsida.net/api/articles/${slug}`,
        );
        if (!res.ok) {
          throw new Error("Ошибка " + res.status);
        }
        const data = await res.json();
        reset({
          title: data.article.title,
          description: data.article.description,
          body: data.article.body,
          tags: (data.article.tagList || []).join(", "),
        });
      } catch (err) {
        setServerError("Не удалось загрузить статью для редактирования.");
        console.error(err);
      } finally {
        setIsLoadingArticle(false);
      }
    };

    fetchArticle();
  }, [isEditing, slug, reset]);

  const onSubmit = async ({ title, description, body, tags }) => {
    setServerError("");
    const tagList = tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);

    try {
      const article = isEditing
        ? await updateArticle(slug, { title, description, body, tagList })
        : await createArticle({ title, description, body, tagList });
      navigate(`/articlepage/${article.slug}`);
    } catch (apiErrors) {
      setServerError(getApiError(apiErrors));
    }
  };

  if (isLoadingArticle) {
    return <p className="loading-wrapper">Загрузка...</p>;
  }

  return (
    <main className="new-post-page">
      <ArticleForm
        onSubmit={handleSubmit(onSubmit)}
        register={register}
        errors={errors}
        isSubmitting={isSubmitting}
        serverError={serverError}
        isEditing={isEditing}
        watch={watch}
        setValue={setValue}
      />
    </main>
  );
};

export default NewPostPage;
