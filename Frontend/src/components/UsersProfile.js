import React, { useState , useEffect, useRef} from "react";
import './../css/userProfile.css'
import axios from "axios";
import EditProfile from "./EditProfile";
import { getUserData } from "../services/UserService";
import { Avatar, Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material";
import ModeEditIcon from '@mui/icons-material/ModeEdit';

const UsersProfile=()=>{
    const [password , setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [userName, setUserName] = useState('');
    const [userCourse, setUserCourse]=useState('');
    const [openEdit, setOpenEdit] = useState(false)
    const [editProfileMode, setEditProfileMode] = useState(true);
    const [userImg, setUserImg] = useState('');
    const fileInputRef = useRef(null);
    useEffect(()=>{
        const userData = getUserData();
        const storedPassword = localStorage.getItem('userPassword');
        const storedEmail = localStorage.getItem('email');
        const storedName = localStorage.getItem('username')
        setPassword(storedPassword);
        setEmail(storedEmail);
        setUserName(storedName)
        setUserCourse(userData.course)


    },[])
    console.log()
    const handleImageChange = (event) => {
        const selectedFile = event.target.files[0];
    
        if (selectedFile) {
          const imageUrl = URL.createObjectURL(selectedFile);
          setUserImg(imageUrl);
        }
      };
    
      const handleEditImageClick = () => {
        fileInputRef.current.click();
      };
    const editProfileClick = (editProfileMode) => {
        setOpenEdit(true);
        setEditProfileMode(editProfileMode);
    }
    function createButton(name){
        return(
            <Button onClick={() => editProfileClick(false)} className="changePasswordButton">{name}</Button>
        )
    }
    function createData(rowName, value){
        return {rowName, value}
    }

    const rows = [
        createData('Name', userName),
        createData('Email', email),
        createData('Password', createButton('Change Password'))
    ]

    const additionalRows = [
        createData('Language Course', userCourse),
        createData('Phone Number', createButton('Add Phone'))
    ]

    return(
        <div className="userProfileWrapper">
            <Box sx={{backgroundColor:"white", width:"13%",height:"100%", padding:"0 5vh"}}>
                <Button variant="text" sx={{width:"100%", marginTop:"3vh"}}>My Dashboard</Button>
                <Button variant="text" sx={{width:"100%", marginTop:"3vh"}}>Acheivements</Button>
                <Button variant="text" sx={{width:"100%", marginTop:"3vh"}}>Support</Button>
            </Box>
            <Box sx={{backgroundColor:"#f6f6f6", width:"78%",height:"auto", padding:"2vh 5vh", display:"flex"}}> 
                <Box sx={{backgroundColor:"white", width:"40%",height:"85%", padding:"2vh 5vh", borderRadius:"10%"}}>
                    <Box sx={{width:"100%", height:"auto", display:"flex",justifyContent:"center", marginTop:"2vh"}}>
                        <Avatar
                            alt="profile picture"
                            src={userImg}
                            sx={{ width: 200, height: 200}}
                            />
                            <ModeEditIcon onClick={handleEditImageClick} sx={{ position: 'absolute', left: "85vh", top: "42vh", background: 'white', borderRadius: '50%', cursor: 'pointer' }}/>
                            <input
                                type="file"
                                ref={fileInputRef}
                                style={{ display: "none" }}
                                onChange={handleImageChange}
                            />
                    </Box>
                    <div style={{display:"flex"}}>
                        <h1 style={{color:"black", margin:"2vh 0", fontSize:"4vh"}}>Basic Informations</h1>
                        <ModeEditIcon onClick={() => editProfileClick(true)} sx={{ position: 'absolute', left: "105vh", top: "49vh", background: 'white', borderRadius: '50%', cursor: 'pointer' }}/>
                    </div>
                    
                     <Box sx={{backgroundColor:"#f6f6f6", width:"100%", height:"auto",marginBottom:"3vh"}}>
                        <TableContainer component={Paper} >
                            <Table sx={{width:"100%"}}>
                                <TableBody>
                                    {rows.map((row)=>(
                                        <TableRow key={row.rowName} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                            <TableCell scope="row">{row.rowName}</TableCell>
                                            <TableCell align="right">{row.value}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        
                    </Box>   
                </Box>

                <Box sx={{width:"40%", height:"100%", marginLeft:"10vh"}}>
                    <Box sx={{backgroundColor:"white", width:"100%",height:"40%", padding:"2vh 5vh", borderRadius:"5%"}}> 
                        <h1 style={{color:"black", margin:"2vh 0", fontSize:"4vh"}}>Additional Informations</h1>
                        <Box sx={{backgroundColor:"#f6f6f6", width:"100%", height:"auto",marginBottom:"3vh"}}>
                            <TableContainer component={Paper} >
                                <Table sx={{width:"100%"}}>
                                    <TableBody>
                                        {additionalRows.map((row)=>(
                                            <TableRow key={row.rowName} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                <TableCell scope="row">{row.rowName}</TableCell>
                                                <TableCell align="right">{row.value}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>   
                    </Box>
                    <Box sx={{backgroundColor:"white", width:"100%",height:"45%", padding:"2vh 5vh", borderRadius:"5%", marginTop:"5vh"}}> 
                        <h1 style={{color:"black", margin:"2vh 0", fontSize:"4vh"}}>Last Achievements</h1>
                        <Box sx={{backgroundColor:"#f6f6f6", width:"100%", height:"auto",marginBottom:"3vh"}}>
                            
                        </Box>   
                    </Box>
                </Box>
            </Box>
            {openEdit && <EditProfile open={openEdit} onClose={() => setOpenEdit(false)} editProfileMode={editProfileMode} />}
        </div>
    )
}

export default UsersProfile