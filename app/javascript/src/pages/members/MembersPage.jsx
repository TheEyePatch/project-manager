import React, { useEffect, useContext, useState } from "react";
import { getProjectMembers } from "../../api";
import AuthContext from "../../store/AuthContext";
import SubHeaderContext from "../../store/SubHeaderContext";
import { UserAvatar } from "../../components";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


function MembersPage () {
  const auth = useContext(AuthContext)
  const subHeaderCtx = useContext(SubHeaderContext)

  const headers = [
    '',
    'Email',
    'Account',
    'First Name',
    'Last Name'
  ]

  const [rows, setRows] = useState([])

  useEffect(() => {
    getProjectMembers({params: {project_id: subHeaderCtx.project_id}, token: auth.token})
    .then(res => {
      setRows([...res.participants, res.owner])
    })
  }, [])

  return (
    <section style={{ overflowY: 'auto', boxSizing: 'border-box', paddingLeft: '180px', paddingTop: '5rem', width: '100vw', height: '100vh',backgroundColor: '#FDF5E6'}}>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {
              headers.map(cell => {
                return <TableCell key={cell}>
                  <strong style={{weight: 400}}>{cell}</strong>
                </TableCell>
              })
            }
          </TableRow>
        </TableHead>
        {
          rows.length > 0 && (
            <TableBody>
            {  rows.map(row => {
                return (
                  <TableRow key={row.id}>
                    <TableCell><UserAvatar user={row} height={'2rem'}/></TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>{row.account}</TableCell>
                    <TableCell>{row.first_name}</TableCell>
                    <TableCell>{row.last_name}</TableCell>
                  </TableRow>
                )
              })
            }
             </TableBody>
          )
        }
      </Table>
      </TableContainer>

      { rows.length < 1 && <h1>Empty</h1> }
    </section>
  )
}

export default MembersPage;
