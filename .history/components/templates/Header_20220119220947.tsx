import React, { useState } from "react";
import Link from "next/link";
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';

import { User } from "../../models/User";

export default function Header() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [user, setUser] = useState<User>();
  const handleClick = (event:React.MouseEvent<HTMLElement>) => {
	  setAnchorEl(null);
  }
  return (
	  <React.Fragment>
		  <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
		  <Link href="/user/login">
			  <Typography sx={{ minWidth: 100 }} >Home</Typography>
			  </Link>
		  <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
	  </React.Fragment>
  )
}
