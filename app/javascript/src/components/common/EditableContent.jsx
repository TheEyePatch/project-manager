import React, { useRef, useState } from 'react'
import {
  IconButton
} from '@mui/material'
import BorderColorTwoToneIcon from '@mui/icons-material/BorderColorTwoTone';
import SaveAsRoundedIcon from '@mui/icons-material/SaveAsRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';

function EditableContent ({ children, attribute, submitEdit, cancelEdit }){
  let elements = React.Children.toArray(children)
  const [contentEditable, setIsEditable] = useState(false)
  const element = useRef();
  if(elements.length > 1) throw Error("Can't have more than one child!")

  const editStyle = { border: '.5px solid rgba(0, 0, 0, 0.19)', borderRadius: '5px', backgroundColor: 'rgba(0, 0, 0, 0.04)' }
  const newElements = React.cloneElement(elements[0], {
    contentEditable: contentEditable,
    suppressContentEditableWarning: true,
    ref: element,
    sx: contentEditable ? {...elements[0].props.sx, ...editStyle } : elements[0].props.sx
  })

  const handleSave = () => {
    const value = element.current?.value || element.current?.innerText;
    if(typeof(submitEdit) == 'function') submitEdit({value: value, attribute: attribute})
    setIsEditable(false)
  }

  const handleCancel = () => {
    element.current.innerText = elements[0].props.children
    const value = element.current?.value || element.current?.innerText;
    if( typeof(cancelEdit) == 'function') cancelEdit({value: value, attribute: attribute})
    setIsEditable(false)
  }

  const handleEdit = () => {
    setIsEditable(true)
  }

  return (
    <>
      {newElements}
      {
        contentEditable ? (
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginRight: '20px' }}>
            <IconButton onClick={handleSave}>
              <SaveAsRoundedIcon fontSize='small'/>
            </IconButton>
            <IconButton onClick={handleCancel}>
              <CancelRoundedIcon fontSize='small'/>
            </IconButton>
          </div>
        ) : <div style={{ display: 'flex', justifyContent: 'flex-end', marginRight: '20px' }}>
              <IconButton onClick={handleEdit}>
                <BorderColorTwoToneIcon fontSize='small'/>
              </IconButton>
            </div> 
          }
    </>
  )
}

export default EditableContent;