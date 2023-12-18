import { useEffect, useState } from "react";
import { Post } from "../components/Post";

export default function Home() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    // fetch("http://localhost:4000/post")
    fetch("https://blog-backend-q1yl.onrender.com/post")
      .then((response) => response.json())
      .then((posts) => setPosts(posts));
  }, []);
  return (
    <div>
      {posts.length > 0 && posts.map((post, id) => <Post key={id} {...post} />)}
    </div>
  );
}
