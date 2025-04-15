"use client";

import { useEffect, useState } from "react";
import PostItem from "@/components/PostItem";

type Post = {
  _id: string;
  title: string;
  content: string;
  img?: string;
};

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [img, setImg] = useState("");
  const [showForm, setShowForm] = useState(false);

  const inputStyle = {
    width: "100%",
    padding: "8px",
    marginTop: 4,
    marginBottom: 12,
    borderRadius: "6px",
    border: "1px solid #bbb",
    outline: "none",
    transition: "border 0.2s",
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    const response = await fetch("/api/posts");
    const data = await response.json();
    setPosts(data);
  }

  async function addPost() {
    if (!title || !content) return;
    await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content, img }),
    });

    setTitle("");
    setContent("");
    setImg("");
    setShowForm(false);
    fetchPosts();
  }

  async function deletePost(id: string) {
    await fetch("/api/posts", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    fetchPosts();
  }

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "1rem", fontSize: "2rem" }}>Посты</h1>

      <button
        onClick={() => setShowForm((prev) => !prev)}
        style={{
          display: "block",
          margin: "0 auto 20px",
          padding: "10px 15px",
          backgroundColor: "#00b1c9",
          color: "#fff",
          fontWeight: "bold",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        {showForm ? "✖ Закрыть" : "➕ Добавить пост"}
      </button>

      {showForm && (
        <div
          style={{
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "20px",
            marginBottom: "30px",
            background: "#f9f9f9",
          }}
        >
          <label>
            Заголовок:
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={inputStyle}
              onFocus={(e) =>
                (e.currentTarget.style.border = "2px solid #00b1c9")
              }
              onBlur={(e) =>
                (e.currentTarget.style.border = "1px solid #bbb")
              }
            />
          </label>

          <label>
            Текст:
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={4}
              style={inputStyle}
              onFocus={(e) =>
                (e.currentTarget.style.border = "2px solid #00b1c9")
              }
              onBlur={(e) =>
                (e.currentTarget.style.border = "1px solid #bbb")
              }
            />
          </label>

          <label>
            Ссылка на изображение:
            <input
              value={img}
              onChange={(e) => setImg(e.target.value)}
              style={inputStyle}
              onFocus={(e) =>
                (e.currentTarget.style.border = "2px solid #00b1c9")
              }
              onBlur={(e) =>
                (e.currentTarget.style.border = "1px solid #bbb")
              }
            />
          </label>

          <button
            onClick={addPost}
            style={{
              padding: "10px 14px",
              backgroundColor: "#00b1c9",
              color: "#fff",
              fontWeight: "bold",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              marginTop: "10px",
            }}
          >
            ✅ Сохранить
          </button>
        </div>
      )}

      <ul style={{ listStyle: "none", padding: 0 }}>
        {posts.map((post) => (
          <PostItem key={post._id} post={post} onDelete={() => deletePost(post._id)} />
        ))}
      </ul>
    </div>
  );
}
