import React, { useEffect, useContext, useState } from 'react'
import { getUserProfile } from '../../api'
import AuthContext from '../../store/AuthContext'
import { UpdateForm } from '../../components/index'

function ProfilePage() {
  const authCtx = useContext(AuthContext);
  const [userData, setUserData] = useState({})
  useEffect(() => {
    getUserProfile(authCtx.token)
    .then(res => {
      setUserData(res)
      }
    )
  }, [])

  return (
    <section style={{ overflowY: 'auto', boxSizing: 'border-box', paddingTop: '5rem', width: '100vw', height: '100vh',backgroundColor: 'purple'}}>
      { userData.email && <UpdateForm user={userData} token={authCtx.token}/>}
    </section>
  )
}

export default ProfilePage;