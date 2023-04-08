import React, { useEffect, useContext, useState } from 'react'
import UserContext from '../../store/UserContext'
import { UpdateForm } from '../../components/index'

function ProfilePage() {
  const userCtx = useContext(UserContext)
  return (
    <section style={{ overflowY: 'auto', boxSizing: 'border-box', paddingTop: '5rem', width: '100vw', height: '100vh',backgroundColor: '#FDF5E6'}}>
      { Object.values(userCtx.currentUser).length > 0 && <UpdateForm user={userCtx.currentUser}/>}
    </section>
  )
}

export default ProfilePage;
