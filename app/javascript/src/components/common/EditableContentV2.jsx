import React, { useRef, useState } from 'react'
import {
  IconButton
} from '@mui/material'
import BorderColorTwoToneIcon from '@mui/icons-material/BorderColorTwoTone';
import SaveAsRoundedIcon from '@mui/icons-material/SaveAsRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';

function EditableContentV2 ({ innerHTML, attribute, submitEdit, cancelEdit, style }){
  const element = useRef(innerHTML)
  const [contentEditable, setIsEditable] = useState(false)
  const [contentStyle, setContentStyle] = useState(style)
  const parse = new DOMParser()
  const handleChange = (e) => {
    let text = e.currentTarget.innerHTML
    let doc = parse.parseFromString(text, 'text/html')
    console.log(doc.firstChild.innerHTML)

    element.current = doc.firstChild.innerHTML
  }

  // Component Methods
  const handleSave = () => {
    const value = element.current;
    if(typeof(submitEdit) == 'function') submitEdit({value: value, attribute: attribute})
    setContentStyle(style)
    setIsEditable(false)
  }

  const handleCancel = () => {
    const value = element.current;
    if( typeof(cancelEdit) == 'function') cancelEdit({value: value, attribute: attribute})
    setContentStyle(style)
    setIsEditable(false)
  }

  const editStyle = { border: '.5px solid rgba(0, 0, 0, 0.20)', borderRadius: '5px', backgroundColor: 'rgba(0, 0, 0, 0.01)' }

  const handleEdit = () => {
    setContentStyle(prev => {
      return { ...prev, ...editStyle }
    })
    setIsEditable(true)
  }

  return (
    <>
      <div 
        contentEditable={contentEditable}
        dangerouslySetInnerHTML={{ __html: element.current }}
        value={element.current}
        onInput={handleChange}
        style={ contentStyle }
      >
      </div>
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

export default EditableContentV2;