import React ,{useEffect, useState}from "react";
import axios from "axios";
import './../css/flashCards.css'
import { Box, Button, Dialog, DialogTitle, TextField } from "@mui/material";
const EditProfile=({open, onClose, editProfileMode})=>{
    const [id,setId]=useState();
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [success,setSuccess] = useState(false);
    const [editProfile, setEditProfile] = useState(true);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    // useEffect(()=>{
    //     setId(localStorage.getItem("userId"))
        
    // })
    // if(success){
    //     onClose();
    //     // window.location.reload();
    // }
    useEffect(() => {
        setId(localStorage.getItem("userId"));
        setEditProfile(editProfileMode);
        if (success) {
          setSuccess(false);
          onClose();
          window.location.reload();
        }
      }, [open, success, onClose]);
    const handleSubmit= async (e)=>{
        e.preventDefault();
        const updatedData = {};
        if (userName) {
            updatedData.name = userName;
            localStorage.setItem('username',updatedData.name)
          }
          if (userEmail) {
            updatedData.email = userEmail;
            localStorage.setItem('email',updatedData.email)
          }
          if (userPassword) {
            updatedData.password = userPassword;
            localStorage.setItem('userPassword',updatedData.password)
          }
          if(editProfile){
            try{ 
                console.log(id)
                console.log(updatedData.email, updatedData.name)
                await axios.patch(`https://localhost:7258/api/User/UpdateUser/${id}`, JSON.stringify({
                    id: id,
                    UserName: updatedData.name,
                    Email: updatedData.email,
                    Surname: "", 
                    Role: "",
                    LanguageCourse: ""
                }), {
                headers: {
                    "Content-Type": "application/json"
                }
            });
    
                alert("User Edited Successfully");
                console.log(userName,userEmail, userPassword)
                setSuccess(true);
                
            
            }catch(err){
                console.log(JSON.stringify(err.response));
                alert(err.response);
            } 
          }else{
            try{
                await axios.patch(`https://localhost:7258/api/User/ChangePassword/${id}`, {
                    CurrentPassword: currentPassword,
                    NewPassword: newPassword
                }, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                alert("Password Changed Successfully");
                console.log(newPassword)
                setSuccess(true);
            }catch(err){
                console.log(JSON.stringify(err.response));
                alert(err.response);
            } 
          }
                  
    
    }

         
    return(
       <Dialog onClose={()=>onClose(false)} open={open}>
            {editProfileMode ? (
                <>
                <DialogTitle sx={{textAlign:"center"}}>Edit Profile</DialogTitle>
                <Box sx={{width:"70vh", height:"40vh", display:"flex", flexDirection:"column",alignItems:"center"}}>
                    <TextField
                    sx={{width:"80%", margin:"4vh 0"}}
                        type="text" 
                        variant="outlined"
                        label="Name"
                        onChange={(e)=>setUserName(e.target.value)}
                        value = {userName}/>
                    <TextField
                     sx={{width:"80%", marginBottom:"6vh"}}
                        type="email" 
                        variant="outlined"
                        label="Email"
                        onChange={(e)=>setUserEmail(e.target.value)}
                        value = {userEmail}
                        />
                        <Button onClick={handleSubmit}>Save</Button>
                </Box>
                

                </>
            ):(
                <>
                <DialogTitle>Change Password</DialogTitle>
                <Box sx={{width:"70vh", height:"40vh", display:"flex", flexDirection:"column",alignItems:"center"}}>
                    <TextField
                    sx={{width:"80%", margin:"4vh 0"}}
                        type="text" 
                        variant="outlined"
                        label="Current Password"
                        onChange={(e)=>setCurrentPassword(e.target.value)}
                        value = {currentPassword}/>
                    <TextField
                     sx={{width:"80%", marginBottom:"6vh"}}
                        type="text" 
                        variant="outlined"
                        label="New Password"
                        onChange={(e)=>setNewPassword(e.target.value)}
                        value = {newPassword}
                        />
                        <Button onClick={handleSubmit}>Save</Button>
                </Box>
                </>
            )

            }
       </Dialog>

    )
}

export default EditProfile