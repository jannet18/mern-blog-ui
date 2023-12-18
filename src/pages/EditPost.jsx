import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Navigate, useParams } from "react-router-dom";

function EditPost() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [cover, setCover] = useState("");
  const [files, setFiles] = useState(0);
  const [redirect, setRedirect] = useState("");

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

  useEffect(() => {
    // fetch("http://localhost:4000/post/" + id)
    fetch("https://blog-backend-q1yl.onrender.com" + id)
      .then((response) => response.json())
      .then((postInfo) => {
        setTitle(postInfo?.title);
        setSummary(postInfo?.summary);
        setContent(postInfo?.content);
      });
  }, []);
  // console.log(await response.json());
  // if (response.ok) {
  //   setRedirect(true);
  // }

  async function handleUpdatePost(e) {
    e.preventDefault();
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("id", id);
    if (files?.[0]) {
      data.set("file", files?.[0]);
    }
    await fetch("https://blog-backend-q1yl.onrender.com", {
      // await fetch("http://localhost:4000/post", {
      method: "PUT",
      body: data,
      credentials: "include",
    });
    setRedirect(true);
  }
  if (redirect) {
    return <Navigate to={"/post/" + id} />;
  }
  return (
    <>
      <form onSubmit={handleUpdatePost}>
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
        <button style={{ marginTop: "10px" }}>Update post</button>
      </form>
    </>
  );
}

export default EditPost;
