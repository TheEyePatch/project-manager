import React, { useRef, useState } from 'react'
import {
  IconButton
} from '@mui/material'
import BorderColorTwoToneIcon from '@mui/icons-material/BorderColorTwoTone';
import SaveAsRoundedIcon from '@mui/icons-material/SaveAsRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';

function EditableContent ({ children, submitEdit, cancelEdit }){
  let elements = React.Children.toArray(children)
  const [contentEditable, setIsEditable] = useState(false)
  const element = useRef();
  if(elements.length > 1) throw Error("Can't have more than one child!")

  const editStyle = { borderBottom: '2px solid rgb(105,105,105)', backgroundColor: 'rgba(27, 147, 145, 0.1)' }
  elements = React.cloneElement(elements[0], {
    contentEditable: contentEditable,
    suppressContentEditableWarning: true,
    ref: element,
    sx: contentEditable ? {...elements[0].props.sx, ...editStyle } : elements[0].props.sx
  })

  const handleSave = () => {
    const value = element.current?.value || element.current?.innerText;
    if(typeof(submitEdit) == 'function') submitEdit(value)
    setIsEditable(false)
  }

  const handleCancel = () => {
    const value = element.current?.value || element.current?.innerText;
    if( typeof(cancelEdit) == 'function')cancelEdit(value)
    setIsEditable(false)
  }

  const handleEdit = () => {
    setIsEditable(true)
  }

  return (
    <>
      {elements}
      {
        contentEditable ? (
          <>
            <IconButton onClick={handleSave}>
              <SaveAsRoundedIcon fontSize='small'/>
            </IconButton>
            <IconButton onClick={handleCancel}>
              <CancelRoundedIcon fontSize='small'/>
            </IconButton>
          </>
        ) : <IconButton onClick={handleEdit}>
              <BorderColorTwoToneIcon fontSize='small'/>
            </IconButton>
          }
    </>
  )
}

export default EditableContent;