import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../store/AuthContext";
import UserContext from '../../store/UserContext';
import { getNotifications } from '../../api/index'

import { Menu, MenuItem } from '@mui/material'
import { Link } from 'react-router-dom'
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';

import consumer from "../../../channels/consumer";

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
  
  if(notifications.length < 1) return <NotificationsNoneOutlinedIcon />

  const menuItem = (item) => {
    return (
      <Link key={item.id} to={'/projects/1/boards'} style={{ textDecoration: 'none', color: 'inherit' }}>
        <MenuItem divider key={item.id} sx={{whiteSpace: 'normal'}}>
          {item.path}
          {item.message}
        </MenuItem>
      </Link>
    )
  }

  return (
    <>
      <NotificationsRoundedIcon onClick={handleBell} />
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
          notifications.map(item => menuItem(item))
        }
      </Menu>
    </>
  )

}

export default NotifBell;
