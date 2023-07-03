import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../store/AuthContext";
import UserContext from '../../store/UserContext';
import { getNotifications, updateNotifications } from '../../api/index'

import { Menu, MenuItem, Badge } from '@mui/material'
import { Link } from 'react-router-dom'
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';

import consumer from "../../../channels/consumer";

const menuItem = (item, token, setNotifications) => {
  const handleClick = () => { 
    updateNotifications({
      token: token,
      notif_id: item.id,
      params: { viewed: true }})
    .then(res => {
      setNotifications(prev => {
        let collection = prev.map(item => item.id)
        let index = collection.indexOf(res.notification.id)
        prev.splice(index, 1)
  
        let newCollection = prev.map(item => item)

        return newCollection
      })
    })
  }

  return (
    <Link onClick={handleClick} key={item.id} to={'/projects/1/boards'} style={{ textDecoration: 'none', color: 'inherit' }}>
      <MenuItem divider key={item.id} sx={{whiteSpace: 'normal'}}>
        {item.message}
      </MenuItem>
    </Link>
  )
}


function NotifBell({recepient}) {
  // Hooks
  const userCtx = useContext(UserContext)
  const authCtx = useContext(AuthContext)
  const [notifications, setNotifications] = useState([])
  const [anchorElUser, setAnchorElUser] = useState(null)

  // Methods
  const handleBell = (e) => {
    setAnchorElUser(e.currentTarget)
  }

  const handleClose = () => {
    setAnchorElUser(null)
  }

  useEffect(() => {
    if(!userCtx.currentUser.account) return

    getNotifications({ token: authCtx.token })
    .then(res => setNotifications(res.notifications))

    consumer.subscriptions.create({channel: "NotificationChannel", recipient: recepient}, {
      connected() {
        console.log(recepient)
        // Called when the subscription is ready for use on the server
      },
    
      disconnected() {
        // Called when the subscription has been terminated by the server
      },
    
      received(data) {
        setNotifications(prev => [data, ...prev])
        // Called when there's incoming data on the websocket for this channel
      }
    });
  }, [userCtx.currentUser.account])
  
  if(notifications.length < 1) return <NotificationsNoneOutlinedIcon style={{ fontSize: '2.5rem'}} />

  return (
    <Badge variant='dot' color="secondary">
      <NotificationsRoundedIcon style={{ fontSize: '2.5rem'}} onClick={handleBell} />
      <Menu
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right'}}
        transformOrigin={{vertical: 'top', horizontal: 'right'}}
        anchorEl={anchorElUser}
        open={Boolean(anchorElUser)}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: 200,
            width: '50ch'
          }
        }}
      >
        {
          notifications.map(item => menuItem(item, authCtx.token, setNotifications))
        }
      </Menu>
    </Badge>
  )

}

export default NotifBell;
