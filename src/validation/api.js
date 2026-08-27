const API_URL = "https://realworld.habsida.net/api";

const authHeader = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Token ${token}` } : {};
};

export const registerUser = async (username, email, password) => {
  const response = await fetch(`${API_URL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user: { username, email, password } }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw data.errors;
  }
  localStorage.setItem("token", data.user.token);
  return data.user;
};

export const updateUser = async (userData) => {
  const response = await fetch(`${API_URL}/user`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...authHeader(),
    },
    body: JSON.stringify({ user: userData }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw data.errors;
  }
  if (data.user.token) {
    localStorage.setItem("token", data.user.token);
  }
  return data.user;
};

export const createArticle = async (articleData) => {
  const response = await fetch(`${API_URL}/articles`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...authHeader(),
    },
    body: JSON.stringify({ article: articleData }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw data.errors;
  }
  return data.article;
};

export const updateArticle = async (slug, articleData) => {
  const response = await fetch(`${API_URL}/articles/${slug}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...authHeader(),
    },
    body: JSON.stringify({ article: articleData }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw data.errors;
  }
  return data.article;
};

export const favoriteArticle = async (slug) => {
  const response = await fetch(`${API_URL}/articles/${slug}/favorite`, {
    method: "POST",
    headers: authHeader(),
  });
  const data = await response.json();
  if (!response.ok) {
    throw data.errors;
  }
  return data.article;
};

export const unfavoriteArticle = async (slug) => {
  const response = await fetch(`${API_URL}/articles/${slug}/favorite`, {
    method: "DELETE",
    headers: authHeader(),
  });
  const data = await response.json();
  if (!response.ok) {
    throw data.errors;
  }
  return data.article;
};

export const deleteArticle = async (slug) => {
  const response = await fetch(`${API_URL}/articles/${slug}`, {
    method: "DELETE",
    headers: authHeader(),
  });

  if (!response.ok) {
    throw new Error("Не удалось удалить статью");
  }
};
