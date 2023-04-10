import React, { useContext, useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { Link } from 'react-router-dom'
import UserContext from '../store/UserContext';
import AuthContext from '../store/AuthContext';
import { UserAvatar } from '../components/index'
const pages = [ 'home','projects'];
const settings = ['profile', 'logout'];

function Header(){
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
           .then(res => userCtx.setCurrentUser(res))
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
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { md: 'flex' }, mr: 1 }} />
          <Typography variant="h6" noWrap component="span"
            sx={{
              mr: 2,
              display: { md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <Link style={{ textDecoration: 'none', color: 'white' }} to='/'>
              PROJECT MANAGER
            </Link>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { md: 'flex' } }}>
            {pages.map((page) => (
              <Link to={`/${page}`} key={page} style={{ textDecoration: 'none', color: 'white' }}>
                <Button sx={{ my: 2, color: 'white', display: 'block' }}>
                  {page}
                </Button>
              </Link>
            ))}
          </Box>

          {/* User Settings */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                { userCtx.currentUser.account && <UserAvatar user={userCtx.currentUser} size='small' height='3rem' fontSize='2rem'/> }
              </IconButton>
            </Tooltip>
            <Menu sx={{ mt: '45px' }} id="menu-appbar"
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              anchorEl={anchorElUser}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => setting == 'logout' ? menuItem(setting) : (navLink(setting)) )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;