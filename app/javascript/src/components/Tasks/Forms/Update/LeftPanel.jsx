import React from "react";
import {
  Typography
} from '@mui/material'
import { attachTaskImages } from '../../../../api'
import { EditableContentV2, Comments } from '../../../index'

function LeftPanel({ task, handleChange }) {
  const attachmentCallback = async (fileData) => {
    let formData = new FormData()
    formData.append('image', fileData, fileData.name)
    const updateTaskResponse = await attachTaskImages({
      data: formData,
      token: authCtx.token,
      task_id: task.id
    })

    return updateTaskResponse
  }
  return (
    <>
      <Typography
        variant="h6"
        component="p"
        sx={{
          padding: '5px',
          display: { md: 'flex' },
          color: '#173A5E',
          textDecoration: 'none',
          fontWeight:'bold',
          minWidth: '30rem',
          borderBottom: '1px solid rgb(105,105,105)',
          marginX: 3,
        }}
      >
        Description
      </Typography>
      <EditableContentV2 
        innerHTML={task.description}
        attachmentCallback={attachmentCallback}
        attribute={'description'}
        submitEdit={handleChange}
        style={{
          textDecoration: 'none',
          minWidth: '15rem',
          maxWidth: '30rem',
          padding: '5px',
          borderRadius: '5px',
          margin: '10px',
          marginLeft: '15px',
          overflowY: 'hidden',
          minHeight: '10rem',
        }}
      />

      <Comments task_id={task.id} />
    </>
  )
}

export default LeftPanel;
