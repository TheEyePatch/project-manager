import React, { useRef, useState, useMemo } from 'react'
import {
  IconButton
} from '@mui/material'
import BorderColorTwoToneIcon from '@mui/icons-material/BorderColorTwoTone';
import SaveAsRoundedIcon from '@mui/icons-material/SaveAsRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './styles/EditableContent.css'

function EditableContentV2 ({ innerHTML, attribute, submitEdit, cancelEdit, style, attachmentCallback }){
  const element = useRef(innerHTML)
  const [contentEditable, setIsEditable] = useState(false)
  const [contentStyle, setContentStyle] = useState(style)
  const parse = new DOMParser()
  const [value, setValue] = useState(element.current)

  const handleChange = (e) => {
    // let text = e.currentTarget.innerHTML
    // let doc = parse.parseFromString(text, 'text/html')
    // console.log(doc.firstChild.innerHTML)
    setValue(e)
  }

  // Component Methods
  const handleSave = () => {
    element.current = value
    if(typeof(submitEdit) == 'function') submitEdit({value: value, attribute: attribute})
    setContentStyle(style)
    setIsEditable(false)
  }

  const handleCancel = () => {
    // const value = element.current;
    // if( typeof(cancelEdit) == 'function') cancelEdit({value: value, attribute: attribute})
    setValue('')
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
      {
        contentEditable ? (
          <Editor value={value} handleChange={handleChange} handleSave={handleSave} handleCancel={handleCancel} attachmentCallback={attachmentCallback} />
        ) :
          (
            <div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginRight: '20px' }}>
                <IconButton onClick={handleEdit}>
                  <BorderColorTwoToneIcon fontSize='small'/>
                </IconButton>
              </div> 
              <div dangerouslySetInnerHTML={{ __html: element.current }} style={ contentStyle }></div>
            </div>
          )
      }
    </>
  )
}

const Image = Quill.import('formats/image');
Image.className = 'editor-image';
Quill.register(Image, true);

function Editor ({value, handleChange, handleSave, handleCancel, attachmentCallback}) {
  const quillRef = useRef(null)

  const quillImageCallback = () => {
    const imageInput = document.createElement('input')
    imageInput.setAttribute('type', 'file')
    imageInput.setAttribute('accept', 'image/*')
    imageInput.click()
    // const fileUrl = URL.createObjectURL(file)
    imageInput.onchange = async () => {
      const file = imageInput.files[0]
      attachmentCallback(file).then(res => {

        const fileUrl = res.image_url
        let quill = quillRef.current.getEditor()
        const range = quill.getSelection(true)
        quill.insertEmbed(range.index, 'image', fileUrl)
      })
    }
  }

  const modules = useMemo(() => ({
      toolbar: {
        container: [
          { header: [1,2,3,4,5,6, false] },
          { font: [] },
          'bold', 'italic', 'underline', 'strike', 'image'
        ],
        handlers: {
          image: quillImageCallback
        }
      }
    }), [])

  return (
    <>
      <ReactQuill ref={quillRef} theme="snow" value={value} onChange={handleChange} modules={modules}/>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginRight: '20px' }}>
        <IconButton onClick={handleSave}>
          <SaveAsRoundedIcon fontSize='small'/>
        </IconButton>
        <IconButton onClick={handleCancel}>
          <CancelRoundedIcon fontSize='small'/>
        </IconButton>
      </div>
    </>
  )
}

export default EditableContentV2;