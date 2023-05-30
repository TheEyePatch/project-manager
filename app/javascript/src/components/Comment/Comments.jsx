import React, { useState, useEffect } from "react";
import { NewComment, Comment } from '../index'
import { getComments } from '../../api'
import { Button } from '@mui/material'

function Comments ({ task_id }) {
  const [comments, setComments] = useState([])
  const [totalComments, setTotalComments] = useState(0)

  useEffect(() => {
    getComments({ task_id: task_id })
    .then(res => {
      setTotalComments(res.total_comments_count)
      setComments(prev => [...prev, ...res.comments])
    })
  }, [])

  const handleShowComments = () => {
    getComments({ task_id: task_id, last_comment_id:  comments[comments.length - 1]?.id })
    .then(res => {
      setComments(prev => [...prev, ...res.comments])
    })
  }

  const ButtonVal = ({totalComments, commentLength}) => {
    let remainingComments = totalComments - commentLength

    return ( 
      <Button onClick={handleShowComments}>
        Show { remainingComments > 5 ? 5 : remainingComments } more comments...
      </Button>
    )
  }

  return (
    <>
      <NewComment task_id={task_id} setComments={setComments} />
      {
        comments?.map(comment => {
          return <Comment key={comment.id} comment={comment} />
        })
      }

      {
        totalComments - comments.length > 0 && <ButtonVal totalComments={totalComments} commentLength={comments.length} />  
      }
    </>
  )
}

export default Comments;
