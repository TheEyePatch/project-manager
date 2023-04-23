import { Button, Pagination } from '@mui/material';
import React, { useState, useContext, useEffect } from 'react'
import styles from './TasksTable.module.css'
import { getIndexTasks } from '../../api';
import AuthContext from '../../store/AuthContext';

const PAGE_LIMIT = 5

function TasksTable ({tasks, setTasks, summary}) {
  const [pageCount, setPageCount] = useState(1)
  const [page, setPage] = useState(1)
  const authCtx = useContext(AuthContext)

  const handlePage = (val) => {
    setPage(val)
    getIndexTasks({
      token: authCtx.token,
      params: { page: val }
    }).then(res => {
      setTasks(res.tasks)
      setPageCount(Math.ceil(res.task_summary.reduce((acc, init) => acc + init.task_count, 0) / res.page_limit))
    })
  }

  useEffect(() => {
    setPageCount(Math.ceil(summary.reduce((acc, init) => acc + init.task_count, 0) / PAGE_LIMIT))
  }, [])

  return (
    <>
      <table className={styles['task-table']}>
        <thead className={styles['row-head']}>
          <tr>
            <td>Title</td>
            <td>Status</td>
            <td>Reporter</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {
            tasks.map(task => {
              return (
                <tr key={task.id}>
                  <td>{task.title}</td>
                  <td>{task.board_title}</td>
                  <td>{task.reporter_account}</td>
                  <td><Button>View</Button></td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
      <Pagination count={pageCount} siblingCount={2} color="primary" shape="rounded"
        onChange={(e, val) => handlePage(val)}
      />
    </>
  )
}

export default TasksTable;
