import { Box, Button, FormControl, InputLabel, MenuItem, Modal, OutlinedInput, Select, Typography } from "@mui/material"
import AdminService from "../../../services/AdminService"
import { useEffect, useState } from "react";

export const EditModal=({openModal,onCloseModal,itemId,onSuccess,itemModeName, mode})=>{
    const [open, setOpen]=useState(false)
    const [name, setName]=useState("");
    const [points, setPoints]=useState(null);
    const [id, setId]=useState(null);
    const [editMode, setEditMode]=useState(false);
    const [addMode, setAddMode]=useState(false);
    const [achievement, setAchievement]=useState(false)
    const [description, setDescription]=useState('');
    const [category, setCategory]=useState('');
    const adminService = new AdminService();
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        height: 300,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        display:"flex", 
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center",
        borderRadius:"4vh",
      };
      const handleChangeCategory = (event) => {
        setCategory(event.target.value);
      };
    useEffect(()=>{
        setOpen(openModal);
        setId(itemId);
        if(mode === 'edit'){
            setEditMode(true);
        }else{
            setAddMode(true);
        }
        if(itemModeName === 'achievements'){
            setAchievement(true);
        }else{
            setAchievement(false)
        }
    },[openModal])
    const handleClose = () => {
        setOpen(false);
        onCloseModal();
      };
      const handleSaveClick=async()=>{
        if(editMode){
            try{
                await adminService.EditItem(id,name,points,itemModeName);
                onSuccess(true);
            }catch(error){
                console.error("Error while saving achievement",error);
                onSuccess(false);
            } 
        }else if(addMode){
            try{
                await adminService.AddItem(name,points,description,itemModeName, category);
                onSuccess(true);
            }catch(error){
                console.error("Error while saving item",error);
                onSuccess(false);
            } 
        }
        
        handleClose();
    }
    return(
        <Box>
            <Modal
                open={open}
                onClose={handleClose}
                >
                <Box sx={style}>
                    <Box sx={{width:"100%",height:"20%",textAlign:"center"}}>
                        {editMode ? (
                            <Typography variant="h5" component="h2">
                                Edit {itemModeName.charAt(0).toUpperCase() + itemModeName.slice(1)}
                            </Typography>
                        ):(
                            <Typography variant="h5" component="h2">
                                Add {itemModeName.charAt(0).toUpperCase() + itemModeName.slice(1)}
                            </Typography>
                        )}                      
                    </Box>
                    {achievement ? (
                        <Box sx={{width:"100%",height:"65%"}}>
                            <InputLabel sx={{color:"black",fontSize:"20px"}}>Name</InputLabel>
                            <OutlinedInput sx={{width:"100%"}} onChange={(e)=>setName(e.target.value)} placeholder="Please enter text..." />
                            <InputLabel sx={{color:"black",fontSize:"20px"}}>Points</InputLabel>
                            <OutlinedInput sx={{width:"100%"}} onChange={(e)=>setPoints(e.target.value)} placeholder="Please enter number..." />
                        </Box>
                    ):(
                    <Box sx={{width:"100%",height:"65%", display:"flex",flexDirection:"column"}}>
                        <FormControl sx={{width:"30%",marginTop:"-5vh"}}>
                                <InputLabel >Category</InputLabel>
                                <Select
                                    value={category}
                                    label="Category"
                                    onChange={handleChangeCategory}
                                >
                                    <MenuItem value={1}>VOCABULARY</MenuItem>
                                    <MenuItem value={2}>GRAMMAR</MenuItem>
                                </Select>
                        </FormControl>
                            <InputLabel sx={{color:"black",fontSize:"20px"}}>Name</InputLabel>
                            <OutlinedInput sx={{width:"100%"}} onChange={(e)=>setName(e.target.value)} placeholder="Please enter text..." />
                            <InputLabel sx={{color:"black",fontSize:"20px"}}>Description</InputLabel>
                            <OutlinedInput sx={{width:"100%"}} onChange={(e)=>setDescription(e.target.value)} placeholder="Please enter text..." />                 
                    </Box>
                    )}
                    
                    <Button variant="filled" sx={{backgroundColor:"rgb(78, 1, 78)",color:"white",padding:"1vh 6vh",'&:hover': {backgroundColor: "rgb(78, 1, 78) !important",},}}
                     onClick={handleSaveClick}
                     >Save</Button>
                </Box>
            </Modal>
        </Box>
    )
}