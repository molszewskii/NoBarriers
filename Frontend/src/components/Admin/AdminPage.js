import React, { useEffect, useState } from "react";
import './../../css/adminPage.css'
import { Box, Button, Typography } from "@mui/material";
import AdminService from "../../services/AdminService";
import { DataGrid } from '@mui/x-data-grid';
import { ViewCards } from "./components/ViewCards";

const AdminPage=()=>{
    const adminService = new AdminService();
  const [users, setUsers] = useState([]);
  const [openViewAllUsers, setOpenViewAllUsers]= useState(false);
  const [openViewCards, setOpenViewCards]= useState(false);
  const [mode, setMode] = useState('');

  useEffect(() => {
    adminService.getAllUsers().then((data) => {
        const filteredUsers = data.filter(user => user.role !== "ADMIN");
        setUsers(filteredUsers);
    });
  }, []);

  const handleViewAllUsers=()=>{
    setOpenViewAllUsers(true);
    setOpenViewCards(false);
    setMode('');
  }
  const handleViewCards=(modeName)=>{
    setMode(modeName);
    setOpenViewCards(true);
    setOpenViewAllUsers(false);
  }



    return(

      <Box className="adminWrapper" sx={{
        display: 'flex', 
        height: '100vh', 
        boxShadow: '0 4px 12px 0 rgba(0,0,0,0.2)', 
        borderRadius: '8px', 
        overflow: 'hidden'
      }}>
        <Box sx={{
          width: "20%", 
          backgroundColor: "#2c3e50", 
          color: "white",
          display: "flex", 
          flexDirection: "column", 
          padding: "2vh"
        }}>
          <Typography variant="h4" sx={{ 
            mb: 4, 
            fontWeight: "bold", 
            alignSelf: "center" 
          }}>
            ADMIN PANEL
          </Typography>
          <Button variant="text" sx={{ 
            width: "100%", 
            justifyContent: "flex-start", 
            color: "rgba(255, 255, 255, 0.7)", 
            mb: 2,
            "&:hover": { 
              backgroundColor: "rgba(255, 255, 255, 0.08)" 
            }
          }} onClick={handleViewAllUsers}>
            View All Users
          </Button>
          <Button variant="text" sx={{ 
            width: "100%", 
            justifyContent: "flex-start", 
            color: "rgba(255, 255, 255, 0.7)", 
            mb: 2,
            "&:hover": { 
              backgroundColor: "rgba(255, 255, 255, 0.08)" 
            }
          }} onClick={() => handleViewCards('achievements')}>
            Achievements
          </Button>
          <Button variant="text" sx={{ 
            width: "100%", 
            justifyContent: "flex-start", 
            color: "rgba(255, 255, 255, 0.7)", 
            mb: 2,
            "&:hover": { 
              backgroundColor: "rgba(255, 255, 255, 0.08)" 
            }
          }} onClick={() => handleViewCards('levels')}>
            Levels
          </Button>
        </Box>
        <Box sx={{ 
          flexGrow: 1, 
          backgroundColor: "#ecf0f1", 
          padding: "4vh",
          width:"75%"
        }}>
          {openViewAllUsers && (
            <Box sx={{ 
              backgroundColor: "white", 
              borderRadius: '8px', 
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)', 
              p: 4 ,
              overflow:"auto",
              height:"-webkit-fill-available"
            }}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
                User List
              </Typography>
              <Box style={{ height: 'auto', width: '100%' }}>
                <DataGrid
                  rows={users}
                  columns={[
                    { field: 'id', headerName: 'ID', width: 70 },
                    { field: 'userName', headerName: 'User Name', width: 130 },
                    { field: 'surname', headerName: 'Surname', width: 130 },
                    { field: 'passwordHash', headerName: 'Password Hash', width: 300 },
                    { field: 'email', headerName: 'Email', width: 150 },
                    { field: 'languageCourse', headerName: 'Language Course', width: 150 },
                    { field: 'role', headerName: 'Role', width: 100 },
                  ]}
                  sx={{
                    '& .MuiDataGrid-row': {
                      '&:nth-of-type(odd)': { backgroundColor: '#fafafa' },
                    },
                    '& .MuiDataGrid-cell': {
                      borderBottom: `1px solid #ddd`
                    }
                  }}
                />
              </Box>
            </Box>
          )}
          {openViewCards && (
            <ViewCards modeName={mode} />
          )}
        </Box>
      </Box>
      
  
    )
}


export default AdminPage;