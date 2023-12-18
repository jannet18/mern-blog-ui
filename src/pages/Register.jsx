import React, { useState } from "react";
import { Navigate } from "react-router-dom";

export const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  async function register(e) {
    e.preventDefault();
    if (username && password) {
      // await fetch("http://localhost:4000/register",
      await fetch("https://blog-backend-q1yl.onrender.com/register", {
        method: "POST",
        body: JSON.stringify({
          username,
          password,
        }),
        headers: { "Content-Type": "application/json; charset=UTF-8" },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setRedirect(true);
        });
    }
  }
  if (redirect) {
    return <Navigate to="/" />;
  }
  return (
    <form action="" className="register" onSubmit={register}>
      <h1>Register</h1>
      <input
        type="text"
        placeholder="username"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
      />
      <input
        type="password"
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <button>Register</button>
    </form>
  );
};
