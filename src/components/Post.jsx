import React from "react";
import classes from './Post.module.css'

// const names = ["morish", "kumar"]

function Post({author, body}) {
  // const chooseName = Math.random() > 0.5 ? names[0] : names[1]
  return (
    <div className={classes.post}>
      <p className={classes.author}>{author}</p>
      <p className={classes.text}>{body}</p>
    </div>
  );
}

export default Post;
