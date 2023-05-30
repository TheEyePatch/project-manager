import React, { useState, useRef } from "react";
import './styles/comment.css'
import { UserAvatar } from "..";
import { Button } from '@mui/material'

function Comment ({ comment }) {
  const [buttonText, setButtonText] = useState('Show More')
  const [hideButton, setHideButton] = useState(false)

  const handleReadMore = (e) => {
    const commentBody = e.currentTarget.parentNode.querySelector('.comment-body')
    commentBody.classList.toggle('active')

    Array.from(commentBody.classList).includes('active') ? setButtonText('Show less') : setButtonText('Show more')
    commentBody.clientHeight < 80 ? setHideButton(true) : setHideButton(false)
    // console.log(commentBody.clientHeight)
  }

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

      { !hideButton && <Button onClick={handleReadMore} variant={'outlined'}>{buttonText}</Button>}
    </div>
  )
}

export default Comment;
