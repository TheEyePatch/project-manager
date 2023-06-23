import React from "react";
import { useLocation, Link } from 'react-router-dom';

import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material'

const SUB_PAGES = [
  {text: 'members', component: <PeopleAltOutlinedIcon/>},
]

function SubHeader () {
  const currentPath = useLocation();

  if(['/', '/projects'].includes(currentPath.pathname)) return

  return (
    <>
      <List>
        {SUB_PAGES.map(page => (
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
    </>
  )
}

export default SubHeader;
