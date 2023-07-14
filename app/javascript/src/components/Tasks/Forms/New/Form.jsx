import React , { useEffect, useState, useContext } from "react";
import {
  Typography, Dialog, DialogTitle, DialogActions, Button
} from '@mui/material';
import LeftPanel from "./LeftPanel";
import RightPanel from "./RightPanel";
import AuthContext from "../../../../store/AuthContext";
import BoardContext from "../../../../store/BoardContext";
import { getProjectMembers, postTask } from "../../../../api";

function Form ({ modalOpen, setModalOpen, project_id }) {
  //  Hooks
  const [taskInput, setTaskProject] = useState({
    title: '',
    description: '',
    board_id: '',
    position: '',
    assignee_id: '',
    reporter_id: '',
    start_date: '',
    end_date: ''
  })
  const authCtx = useContext(AuthContext);
  const boardCtx = useContext(BoardContext)
  const [statuses, setStatuses] = useState([])
  const [props, setProps] = useState({
    options: [],
    getOptionLabel: (option) => option.account
  })

  useEffect(() => {
    if(boardCtx.boards.length > 0) setStatuses(boardCtx.boards)
    getProjectMembers({ params: { project_id: project_id }, token: authCtx.token })
    .then(res => 
        setProps(prev => {
          return {
            ...prev,
            options: [...res.participants, res.owner]
          }
        })
      )
  }, [modalOpen, project_id])

  // Methods
  const handleClose = () => {
    setTaskProject({
      title: '',
      description: '',
      board_id: '',
      assignee_id: ''
    })

    setModalOpen(false)
  }

  const handleSubmit = () => {
    let params = { task: taskInput, project_id: project_id }
    if(taskInput.title.length < 1) return setInputErrors({title: true})

    postTask({params: params, token: authCtx.token})
    .then(res => {
      boardCtx.setBoards(oldBoard => {
        const newBoard = oldBoard.map(item => {
          if(item.id == res.task.board_id) item.tasks.push(res.task)

          return item
        })

        return newBoard
      })
    })

    setTaskProject({ title: '', description: '', board_id: '', assignee_id: '', reporter_id: ''})
    setModalOpen(false)
  }

  return (
    <Dialog maxWidth={'md'} open={modalOpen} onClose={handleClose}>
      <DialogTitle>
      <Typography variant="h4" component="span" noWrap
          sx={{ display: { md: 'flex' },
            color: '#173A5E',
            textDecoration: 'none',
            fontWeight:'bold',
            minWidth: '25rem',
            mb: 2,
            mt: 2,}}
        >
          Create Task
      </Typography>
    </DialogTitle>
    <div style={{ maxHeight: '40rem', display: 'flex', padding: '1rem'}}>
      <div style={{ overflowY:  'auto', minWidth: '30rem',}}>
        <LeftPanel taskInput={taskInput} setTaskProject={setTaskProject}/>
      </div>
      <div style={{ minWidth: '15rem'}}>
        <RightPanel statuses={statuses} taskInput={taskInput} setTaskProject={setTaskProject} props={props}/>
      </div>
    </div>

    <DialogActions style={{ marginTop: '1rem' }}>
      <Button onClick={handleClose}>Cancel</Button>
      <Button onClick={handleSubmit}>Submit</Button>
    </DialogActions>
    </Dialog>
  )

}

export default Form;
