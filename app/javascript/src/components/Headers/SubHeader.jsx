import React, { useContext } from "react";
import { useLocation, Link } from 'react-router-dom';
import SubHeaderContext from "../../store/SubHeaderContext";

import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider
} from '@mui/material'

function SubHeader () {
  const currentPath = useLocation();
  const subHeaderCtx = useContext(SubHeaderContext)
  const SUB_PAGES = [
    {
      text: 'members',
      path: `/projects/${subHeaderCtx.project_id}/members`,
      component: <PeopleAltOutlinedIcon/>
    },
    {
      text: 'board',
      path: `/projects/${subHeaderCtx.project_id}/boards`,
      component: <ViewColumnIcon/>
    }
  ]

  if(['/', '/projects'].includes(currentPath.pathname)) return

  return (
    <>
      <Divider />
      <List>
        {SUB_PAGES.map(page => (
          <ListItem key={page.text} disablePadding>
            <Link to={page.path} style={{ width: '100%', textDecoration: 'none' }}>
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
      <Divider />
    </>
  )
}

export default SubHeader;
