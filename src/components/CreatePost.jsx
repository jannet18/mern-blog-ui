import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Navigate } from "react-router-dom";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [redirect, setRedirect] = useState(false);

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };

  async function handleCreatePost(e) {
    e.preventDefault();
    const createData = new FormData();
    createData.set("title", title);
    createData.set("summary", summary);
    createData.set("content", content);
    createData.set("file", files[0]);

    const response =
      //  await fetch("http://localhost:4000/post",
      await fetch("https://blog-backend-q1yl.onrender.com/post", {
        method: "POST",
        body: createData,
        credentials: "include",
      });
    console.log(await response.json());
    if (response.ok) {
      setRedirect(true);
    }
  }
  if (redirect) {
    return <Navigate to="/" />;
  }
  return (
    <>
      <form onSubmit={handleCreatePost}>
        <input
          type="text"
          id="title"
          placeholder="title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          id="summary"
          placeholder="summary"
          name="summary"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
        />
        <input
          type="file"
          //   value={files}
          onChange={(e) => setFiles(e.target.files)}
        />
        <ReactQuill
          value={content}
          onChange={(newValue) => setContent(newValue)}
          modules={modules}
        />
        <button style={{ marginTop: "10px" }}>Create post</button>
      </form>
    </>
  );
}

export default CreatePost;
