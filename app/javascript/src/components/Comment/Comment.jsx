import React from "react";
import './styles/comment.css'
import { UserAvatar } from "..";

function Comment ({ comment }) {

  return (
    <div className="comment">
      <div className="user-section">
        <UserAvatar user={comment.user} height={'2rem'}/>
        <h4 className="user-account">{comment.user.account}</h4>
      </div>
      <div
        className="comment-body"
        dangerouslySetInnerHTML={{ __html: comment.body }}
      ></div>
    </div>
  )
}

export default Comment;
