import React, { useContext, useState, useRef, useMemo } from "react";
import { createComment, attachTaskImages } from '../../api'
import AuthContext from '../../store/AuthContext'
import 'react-quill/dist/quill.snow.css';
import ReactQuill, { Quill } from 'react-quill';
import './styles/comment.css'
import { Button } from '@mui/material'

const Image = Quill.import('formats/image');
Image.className = 'editor-image';
Quill.register(Image, true);

function NewComment ({ task_id }) {

  const authCtx = useContext(AuthContext)
  const [input, setInput] = useState('')
  const [imageIds, setImageIds] = useState([])
  const [showButtons, setShowButtons] = useState(false)

  const quillRef = useRef(null)

  const quillImageCallback = () => {
    const imageInput = document.createElement('input')
    imageInput.setAttribute('type', 'file')
    imageInput.setAttribute('accept', 'image/*')
    imageInput.click()

    imageInput.onchange = async () => {
      const file = imageInput.files[0]
      let formData = new FormData()
      formData.append('image', file, file.name)
      attachTaskImages({
        data: formData, task_id: task_id, token: authCtx.token
      }).then(res => {
        console.log(res.attachment_id)
        setImageIds(prev => {
          return [...prev, res.attachment_id]
        })

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

  const handleInput = (e) => {
    setInput(e)
    if(e.length > 0) setShowButtons(true)
  }
  const handleSubmit = () => {
    createComment({ 
      params: { body: input },
      image_ids: imageIds,
      task_id: task_id,
      token: authCtx.token,
    }).then(res => {
      console.log(res)
      setShowButtons(false)
    })
  }

  const handleClose = () => {
    setShowButtons(false)
    setInput('')
  }

  return (
  <div className='new-comment'>
    <ReactQuill
      className={'comment-editor'}
      ref={quillRef}
      theme="snow"
      value={input}
      onChange={handleInput}
      modules={modules}
    />
      { showButtons && (
        <div>
          <Button onClick={handleSubmit}>Submit</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </div>
      )}
  </div>
  )
}

export default NewComment;
