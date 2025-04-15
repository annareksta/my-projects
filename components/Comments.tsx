"use client";

import { useEffect, useState } from "react";

type Comment = {
  _id: string;
  postId: string;
  name: string;
  text: string;
  date: string;
  likes: number;
};

export default function Comments({ postId }: { postId: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    const res = await fetch(`/api/comments?postId=${postId}`);
    const data = await res.json();
    const sorted = data.sort(
      (a: Comment, b: Comment) =>
        new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    setComments(sorted);
  };

  const submitComment = async () => {
    if (!name || !text) return;

    setLoading(true);
    await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({ postId, name, text }),
      headers: { "Content-Type": "application/json" },
    });
    setText("");
    await fetchComments();
    setLoading(false);
  };

  const deleteComment = async (id: string) => {
    await fetch("/api/comments", {
      method: "DELETE",
      body: JSON.stringify({ commentId: id }),
      headers: { "Content-Type": "application/json" },
    });
    fetchComments();
  };

  const likeComment = async (id: string) => {
    await fetch("/api/comments", {
      method: "PATCH",
      body: JSON.stringify({ commentId: id }),
      headers: { "Content-Type": "application/json" },
    });
    fetchComments();
  };

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

  return (
    <div style={{ marginTop: "1rem" }}>
      <button
        onClick={() => setShow(!show)}
        style={{
          cursor: "pointer",
          border: "none",
          background: "none",
          fontWeight: "bold",
          color: "#007bff",
        }}
      >
        💬 Комментарии ({comments.length})
      </button>

      {show && (
        <div
          style={{
            marginTop: "1rem",
            border: "1px solid #ccc",
            padding: "1rem",
            borderRadius: "8px",
            background: "#fefefe",
          }}
        >
          <ul style={{ padding: 0, listStyle: "none" }}>
            {comments.map((c) => (
              <li
                key={c._id}
                style={{
                  marginBottom: "0.75rem",
                  borderBottom: "1px solid #eee",
                  paddingBottom: "0.5rem",
                }}
              >
                <div>
                  <strong>{c.name}</strong> —{" "}
                  {new Date(c.date).toLocaleString()}
                </div>
                <div>{c.text}</div>
                <div style={{ fontSize: "0.9em", marginTop: "0.25rem" }}>
                  ❤️ {c.likes} &nbsp;
                  <button
                    onClick={() => likeComment(c._id)}
                    style={{ cursor: "pointer" }}
                  >
                    +1
                  </button>{" "}
                  &nbsp;
                  <button
                    onClick={() => deleteComment(c._id)}
                    style={{
                      cursor: "pointer",
                      color: "red",
                      border: "none",
                      background: "none",
                    }}
                  >
                    Удалить
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <hr />
          <h4>Добавить комментарий</h4>
          <input
            placeholder="Ваше имя"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={inputStyle}
            onFocus={(e) =>
              (e.currentTarget.style.border = "2px solid #00b1c9")
            }
            onBlur={(e) =>
              (e.currentTarget.style.border = "1px solid #bbb")
            }
          />
          <textarea
            placeholder="Комментарий"
            value={text}
            onChange={(e) => setText(e.target.value)}
            style={inputStyle}
            onFocus={(e) =>
              (e.currentTarget.style.border = "2px solid #00b1c9")
            }
            onBlur={(e) =>
              (e.currentTarget.style.border = "1px solid #bbb")
            }
          />
          <button
            onClick={submitComment}
            disabled={loading}
            style={{
              padding: "10px 14px",
              backgroundColor: "#00b1c9",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            {loading ? "Отправка..." : "Отправить"}
          </button>
        </div>
      )}
    </div>
  );
}
