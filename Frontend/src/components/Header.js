import React, { useEffect, useState } from "react";
import './../css/header.css'
import { useLocation, useNavigate } from "react-router-dom";
import { Avatar, Box, Divider, ListItemIcon, Menu, MenuItem } from "@mui/material";
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
const Header=()=>{
    const [userName,setUserName] = useState("")
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleLogout=()=>{
      navigate("/login")
      localStorage.clear();
    }

    const handleProfileClick=()=>{
      navigate("/profile")
    }
    useEffect(()=>{
      const username = localStorage.getItem("username")
      setUserName(username);
    })
    return(
        <header className="headerUserSite">
          <h1>NoBarriers</h1>
          <Box sx={{display:"flex", alignItems:"center", marginRight:"40px"}} onClick={handleClick}>
            {userName ? (
              <>
              <Avatar alt="profile picture" sx={{ width: 30, height: 30,marginRight:"10px",marginTop:"0.5vh"}}>{userName?.slice(0,1)}</Avatar>
              <h2 style={{margin:"0"}}>{userName}</h2>
              </>
            ):
            (
              <></>
            )}
            
          </Box>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                '& .MuiAvatar-root': {
                  width: 40,
                  height: 40,
                  ml: -0.5,
                  mr: 1,
                },
                '&:before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem onClick={handleProfileClick}>
              <Avatar /> My account
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <Settings fontSize="small" />
              </ListItemIcon>
              Settings
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
      </Menu>
        </header>
    )
}

export default Header