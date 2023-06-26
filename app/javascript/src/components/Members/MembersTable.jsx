import React from "react";
import { UserAvatar } from "../../components";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material'


export default function MembersTable ({rows}) {
  const headers = [
    '',
    'Email',
    'Account',
    'First Name',
    'Last Name'
  ]

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
