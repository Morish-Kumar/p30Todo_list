import React, { useEffect, useState } from "react";
import classes from "./PostsList.module.css";
import NewPost from "./NewPost";
import Modal from "./Modal";
import Post from "./Post";

function PostsList({ isPosting, onStopPosting }) {
  // fetch("http://localhost:8080/posts")
  //   .then((response) => response.json())
  //   .then((data) => {
  //     setPosts(data.posts);
  //   });

  const [posts, setPosts] = useState([]);
  const [isFetching, setIsFetching] = useState(false)

  // getting the post data from backend
  useEffect(() => {
    setIsFetching(true)
    async function fetchPosts() {
      const respone = await fetch("http://localhost:8080/posts")
      const resData = await respone.json()
       setPosts(resData.posts)
       setIsFetching(false)
    }
    fetchPosts()
  }, []);

  function addPostHandler(postData) {
    // sending post data to backend
    fetch("http://localhost:8080/posts", {
      method: "POST",
      body: JSON.stringify(postData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    setPosts((existingPosts) => [postData, ...existingPosts]);
  }

  return (
    <>
      {isPosting ? (
        <Modal onClose={onStopPosting}>
          <NewPost onCancel={onStopPosting} onAddPost={addPostHandler} />
        </Modal>
      ) : (
        false
      )}
      {!isFetching && posts.length > 0 && (
        <ul className={classes.posts}>
          {posts.map((post) => (
            <Post key={post.body} author={post.author} body={post.body} />
          ))}
        </ul>
      )}
      {!isFetching && posts.length === 0 && (
        <div style={{ textAlign: "center", color: "white" }}>
          <h2>There is no Posts yet..</h2>
          <p>Start adding some</p>
        </div>
      )}

      {isFetching && (<div style={{ textAlign: "center", color: "white" }}>
          <h3>Loading posts....</h3>
        </div>)}
    </>
  );
}

export default PostsList;
