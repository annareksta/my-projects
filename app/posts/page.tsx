"use client";

import { useEffect, useState } from "react";

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

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    try {
      const response = await fetch("/api/posts");

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Ошибка загрузки постов:", errorText);
        throw new Error(`HTTP error ${response.status}`);
      }

      const data = await response.json();
      setPosts(data);
    } catch (error: unknown) {
      // 👇 вот тут была ошибка, потому что TS не знает что у error есть message
      if (error instanceof Error) {
        console.error("Ошибка при получении постов:", error.message);
      } else {
        console.error("Неизвестная ошибка:", error);
      }
      setPosts([]);
    }
  }

  async function addPost() {
    await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content, img }),
    });

    await fetchPosts();
  }

  async function deletePost(id: string) {
    await fetch("/api/posts", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    await fetchPosts();
  }

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}>📝 Posts</h1>

      <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "20px" }}>
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <input
          placeholder="Image URL"
          value={img}
          onChange={(e) => setImg(e.target.value)}
        />
        <button onClick={addPost}>Add Post</button>
      </div>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {posts.map((post) => (
          <li key={post._id} style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            {post.img && <img src={post.img} alt="Post image" style={{ width: "100px", borderRadius: "8px" }} />}
            <br />
            <button onClick={() => deletePost(post._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
