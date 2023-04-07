import React, { useEffect, useState } from 'react'
import Avatar from '@mui/material/Avatar';

function UserAvatar ({user, size, height, fontSize}) {
  const [currentSize, setSize] = useState('small')
  const [currentHeight, setHeight] = useState('3rem')
  const [currentFontSize, setfontSize] = useState('1rem')

  useEffect(() => {
    if(size) setSize(size)
    if(height) setHeight(height)
    if(fontSize) setfontSize(fontSize)
  }, [])
  return (
    <Avatar alt={user.account}
      size={currentSize}
      src={user?.avatar_url}
      sx={{ width: currentHeight, height: currentHeight, fontSize: currentFontSize }}>
      {user.account[0]}
    </Avatar>
  )
}

export default UserAvatar