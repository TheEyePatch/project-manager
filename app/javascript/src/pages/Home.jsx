import React, { useContext, useEffect, useState } from "react";
import { TasksTable } from '../components/index'
import { getIndexTasks } from '../api/index'
import AuthContext from "../store/AuthContext";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { Pagination } from '@mui/material';
import checklistGif from '../images/checklist.gif'

ChartJS.register(ArcElement, Tooltip, Legend);

function Home(){
  const [tasks, setTasks] = useState([])
  const [summary, setSummary] = useState([])
  const authCtx = useContext(AuthContext)
  const [data, setData] = useState({
    labels: [],
    datasets: []
  })
  useEffect(() => {
    getIndexTasks({token: authCtx.token})
    .then(res => {
      setData({
        labels: res.task_summary.map(summary => summary.status),
        datasets: [{
          label: '# of Tasks',
          data: res.task_summary.map(summary => summary.task_count),
          backgroundColor: res.task_summary.map(_summary => `rgb(${Math.random() * 256}, ${Math.random() * 256}, ${Math.random() * 256})`),
          borderWidth: 1
        }]
      })
      setTasks(res.tasks)
      setSummary(res.task_summary)
    })
  }, [])


  return tasks.length > 0 ? <Data tasks={tasks} data={data} setTasks={setTasks} summary={summary}/> : <EmptyData/>
}

function Data({ data, tasks, setTasks, summary }) {
  return (
    <section style={{ zIndex: 0, overflowY: 'scroll', boxSizing: 'border-box', paddingTop: '5rem', width: '100vw', height: '100vh',backgroundColor: '#FDF5E6'}}>
      <div style={{ boxSizing: 'border-box', display: 'flex', justifyContent: "space-around", alignItems: 'center'}}>
        <div style={{maxWidth: '60vw', minWidth: '30vw'}}>
          <Doughnut data={data}/>
        </div>
        <div>
          <TasksTable tasks={tasks} setTasks={setTasks} summary={summary} />
        </div>
      </div>
      <h1 style={{position: 'fixed', bottom: 0, right: 50, fontSize: '12em', fontFamily:'sans-serif', zIndex: -1, margin: 0, fontWeight: 950, color: '#d9d9d9'}}>
        OVERVIEW
      </h1>
    </section>
  )
}

function EmptyData() {
  return (
    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', height: '100vh', boxSizing: 'border-box', padding: '1em'}}>
      <img src={checklistGif} alt="checklistGif" style={{ width: '20vw' }} />
      <h1 style={{
        fontSize: '2em',
        fontFamily:'sans-serif',
        fontWeight: 950,
        color: '#d9d9d9'
        }}
      >
        NO RECENT TASK
      </h1>
    </div>
  )
}

export default Home;
