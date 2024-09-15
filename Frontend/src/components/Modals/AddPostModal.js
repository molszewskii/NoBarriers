import { Box, Button, FilledInput, Input, InputLabel, Modal, OutlinedInput, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import ForumService from "../../services/ForumService";

export const AddPostModal=({openModal,onCloseModal,onSuccess})=>{
    const [open, setOpen] = useState(false);
    const [title,setTitle]=useState("");
    const [description,setDescription]=useState("")
    const userId = localStorage.getItem("userId");
    const forumService = new ForumService();
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
    useEffect(() => {
      setOpen(openModal);
    }, [openModal]);
  
    const handleClose = () => {
      setOpen(false);
      onCloseModal();
    };
    const handleSaveClick=async()=>{
        try{
            await forumService.addQuestion(title,description,userId);
            onSuccess(true);
        }catch(error){
            console.error("Error while saving question",error);
            onSuccess(false);
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
                        <Typography variant="h5" component="h2">
                            Add Question
                        </Typography>
                    </Box>
                    <Box sx={{width:"100%",height:"65%"}}>
                    <InputLabel sx={{color:"black",fontSize:"20px"}}>Title</InputLabel>
                    <OutlinedInput sx={{width:"100%"}} onChange={(e)=>setTitle(e.target.value)} placeholder="Please enter text..." />
                    <InputLabel sx={{color:"black",fontSize:"20px"}}>Description</InputLabel>
                    <OutlinedInput sx={{width:"100%"}} onChange={(e)=>setDescription(e.target.value)} placeholder="Please enter text..." />
                    </Box>
                    <Button variant="filled" sx={{backgroundColor:"rgb(78, 1, 78)",color:"white",padding:"1vh 6vh",'&:hover': {backgroundColor: "rgb(78, 1, 78) !important",},}}
                     onClick={handleSaveClick}
                     >Save</Button>
                </Box>
            </Modal>
        </Box>
    )
}