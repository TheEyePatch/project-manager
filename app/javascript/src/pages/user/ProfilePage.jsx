import React, { useEffect, useContext, useState } from 'react'
import UserContext from '../../store/UserContext'
import { UpdateForm } from '../../components/index'

function ProfilePage() {
  const userCtx = useContext(UserContext)
  useEffect(() => {
    userCtx.fetchCurrentUser().then(res => {
      userCtx.setCurrentUser(res)
    })
  }, [])

  return (
    <section style={{ overflowY: 'auto', boxSizing: 'border-box', paddingTop: '5rem', width: '100vw', height: '100vh',backgroundColor: 'purple'}}>
      { Object.values(userCtx.currentUser).length > 0 && <UpdateForm user={userCtx.currentUser}/>}
    </section>
  )
}

export default ProfilePage;