"use client";

import Comments from "./Comments";

type Post = {
  _id: string;
  title: string;
  content: string;
  img?: string;
};

export default function PostItem({
  post,
  onDelete,
}: {
  post: Post;
  onDelete: () => void;
}) {
  return (
    <li
      style={{
        border: "1px solid #ccc",
        padding: "16px",
        marginBottom: "16px",
        borderRadius: "8px",
        backgroundColor: "#fdfdfd",
      }}
    >
      
      <h2 style={{ fontSize: "1.3rem", fontWeight: "bold", marginBottom: "0.5rem" }}>
  {post.title}
</h2>

      <p>{post.content}</p>
      {post.img && (
        <img
          src={post.img}
          alt=""
          style={{ width: "100%", maxWidth: "300px", borderRadius: "6px", marginTop: "0.5rem" }}
        />
      )}

      <button
        onClick={onDelete}
        style={{
          marginTop: "0.75rem",
          padding: "6px 10px",
          backgroundColor: "#ff4d4f",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        🗑 Удалить пост
      </button>

      <Comments postId={post._id} />
    </li>
  );
}
