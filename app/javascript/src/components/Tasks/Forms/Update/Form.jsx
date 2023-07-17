import React, { useState, useContext }  from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography
} from '@mui/material'
import AuthContext from "../../../../store/AuthContext";
import { EditableContent } from '../../../index'
import { UpdateTask, getIndexTasks } from '../../../../api'
import RightPanel from "./RightPanel";
import LeftPanel from "./LeftPanel";
import styles from './Form.module.css'
import BoardContext from "../../../../store/BoardContext";

function Form ({ task, modalOpen, setModalOpen, setTask }) {
  const authCtx = useContext(AuthContext)
  const boardCtx = useContext(BoardContext)
  const [refetchOnClose, setRefetchOnClose] = useState(false)
  // Methods
  const handleClose = () => {
    setModalOpen(false)

    if(!refetchOnClose) return

    const params = { project_id: boardCtx.project_id }
    getIndexTasks({params: params, token: authCtx.token})
    .then(res => {
      boardCtx.setBoards(prev => {
        const boards = prev.map(board => {
          board.tasks = res.tasks[board.id] || []
          return board
        })

        return boards
      })
    })
  }

  const handleChange = async ({value, attribute}) => {
    let params = {task: { [attribute]: String(value)},  task_id: task.id }
    const updateResponse = await UpdateTask({
      params: params,
      token: authCtx.token,
    })

    setTask(updateResponse.task)
    if(attribute == 'board_id' || attribute == 'position') setRefetchOnClose(true)
  }

  return (
    <Dialog maxWidth={'lg'} open={modalOpen} onClose={handleClose}>
      <DialogTitle>
        <EditableContent attribute={'title'} submitEdit={handleChange}>
          <Typography
            variant="h4"
            component="p"
            sx={{
              padding: '5px',
              display: { md: 'flex' },
              color: '#173A5E',
              textDecoration: 'none',
              fontWeight:'bold',
              minWidth: '25rem',
              borderBottom: '2px solid rgb(105,105,105)',
            }}
          >
            {task?.title}
          </Typography>
        </EditableContent>
      </DialogTitle>

      <DialogContent className={styles['update-form']}>
        <div className={styles['left-panel-container']}>
          <LeftPanel task={task} handleChange={handleChange} />
        </div>
        <div className={styles['right-panel-container']}>
          <RightPanel task={task} handleChange={handleChange} />
        </div>
      </DialogContent>
    </Dialog>
  )
}


export default Form;
