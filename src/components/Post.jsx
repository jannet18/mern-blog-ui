import React from "react";
import { formatISO9075 } from "date-fns";
import { Link } from "react-router-dom";

export const Post = ({
  _id,
  title,
  summary,
  content,
  cover,
  createdAt,
  author,
}) => {
  return (
    <>
      <div className="post">
        <Link to={`/post/${_id}`}>
          {/* <img src={"http://localhost:4000/" + cover} alt="/" /> */}
          <img
            src={"https://blog-backend-q1yl.onrender.com/" + cover}
            alt="/"
          />
        </Link>

        <div className="content">
          <h2>{title}</h2>
          <p className="info">
            <a href="/" className="author">
              {author?.username}
            </a>
            <time>{formatISO9075(new Date(createdAt))}</time>
            {/* <time>{format(new Date(createdAt), "MMM d, yyyy HH:mm")}</time> */}
          </p>
          <p>{summary} </p>
        </div>
      </div>
    </>
  );
};
