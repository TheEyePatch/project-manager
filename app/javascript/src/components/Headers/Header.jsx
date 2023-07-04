import React, { useContext, useEffect, useState } from 'react';
import {
  IconButton,
  Box,
  AppBar,
  Toolbar,
  Typography,
  MenuItem,
  Tooltip,
  Container,
  Menu,
  List,
  Drawer,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material'

import AccountTreeTwoToneIcon from '@mui/icons-material/AccountTreeTwoTone';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ConfirmationNumberOutlinedIcon from '@mui/icons-material/ConfirmationNumberOutlined';

import { Link } from 'react-router-dom'
import UserContext from '../../store/UserContext';
import AuthContext from '../../store/AuthContext';
import { UserAvatar, NotifBell } from '../index';
import SubHeader from './SubHeader';

const pages = [ 
  {text: 'home', component: <HomeOutlinedIcon/>},
  {text: 'projects', component: <ConfirmationNumberOutlinedIcon/>},
];
const settings = ['profile', 'logout'];
const drawerWidth = '11rem';

function Header(){
  const headerTextStyle = {
    mr: 2,
    display: { md: 'flex' },
    fontFamily: 'monospace',
    fontWeight: 700,
    letterSpacing: '.3rem',
    color: 'inherit',
    textDecoration: 'none',
  }

  const [anchorElUser, setAnchorElUser] = useState(null);
  const userCtx = useContext(UserContext)
  const authCtx = useContext(AuthContext)
  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget)

  const handleCloseUserMenu = (event) => {
    setAnchorElUser(null);
    if(event.target.slot == 'logout') authCtx.logout()
  };

  useEffect(() => {
    userCtx.fetchCurrentUser()
           .then(res => {
            userCtx.setCurrentUser(res)
            
          }).catch(err => {
            authCtx.logout()
          })
  }, [])

  const menuItem = (setting) => {
    return (
      <MenuItem key={setting} slot={setting} onClick={handleCloseUserMenu}>
        <Typography textAlign="center" slot={setting}>{setting.toUpperCase()}</Typography>
      </MenuItem>
    )
  }

  const navLink = (setting) => {
    return (
      <Link key={setting} style={{ textDecoration: 'none'}} to={`/${setting}`}>
        <MenuItem key={setting} slot={setting}>
          <Typography textAlign="center" slot={setting}>{setting.toUpperCase()}</Typography>
        </MenuItem>
      </Link>
    )
  }

  return (
    <Box>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} >
        <Container maxWidth="xl">
          <Toolbar disableGutters style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ color: 'rgb(220, 220, 220)', display: 'flex', alignItems: 'center' }}>
              <AccountTreeTwoToneIcon sx={{ display: { md: 'flex' }, mr: 1 }} />
              <Typography variant="h6" noWrap component="span" sx={headerTextStyle}>
                <Link style={{ textDecoration: 'none', color: 'white' }} to='/'>
                  TaskMaster
                </Link>
              </Typography>
            </div>

            {/* User Settings */}
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Link style={{ textDecoration: 'none', color: 'inherit' }}><NotifBell recepient={userCtx.currentUser.account}/></Link>

              <Box sx={{ flexGrow: 0, marginLeft: '1rem' }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    { userCtx.currentUser.account && <UserAvatar user={userCtx.currentUser} size='small' height='3rem' fontSize='2rem'/> }
                  </IconButton>
                </Tooltip>
                <Menu sx={{ mt: '45px' }} id="menu-appbar"
                  anchorOrigin={{ vertical: 'top', horizontal: 'right'}}
                  transformOrigin={{vertical: 'top', horizontal: 'right'}}
                  keepMounted anchorEl={anchorElUser} open={Boolean(anchorElUser)} onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => setting == 'logout' ? menuItem(setting) : (navLink(setting)) )}
                </Menu>
              </Box>
            </div>
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth, flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', backgroundColor: 'rgb(248, 248, 255)' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {pages.map(page => (
              <ListItem key={page.text} disablePadding>
                <Link to={`/${page.text}`} style={{ width: '100%', textDecoration: 'none' }}>
                  <ListItemButton>
                    <ListItemIcon>
                      {page.component}
                    </ListItemIcon>
                    <ListItemText primary={page.text.toLocaleUpperCase()} sx={{ color: '#303030' }} />
                  </ListItemButton>
                </Link>
              </ListItem>
            ))}
          </List>
          <SubHeader/>
        </Box>
      </Drawer>
    </Box>
  );
};
export default Header;