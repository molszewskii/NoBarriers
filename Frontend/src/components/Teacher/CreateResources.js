import { Box, Button, Typography,} from "@mui/material";
import React, { useState } from "react";
import quiz from './../../assets/quiz.jpg'
import tests from './../../assets/tests.jpg'
import { AddFlashCardBoxModal } from "../Modals/AddFlashCardBoxModal";
import { AddTest } from "../Modals/AddTest";
export const CreateResources=()=>{
    const [openAddFlashCardModal, setOpenFlashCardModal]=useState(false)
    const [openAddTestModal, setOpenTestModal]=useState(false)
    const openFlashCardModal =()=>setOpenFlashCardModal(true);
    const closeAddFlashCardModal =()=>setOpenFlashCardModal(false);
    const openTestModal =()=>setOpenTestModal(true);
    const closeAddTestModal =()=>setOpenTestModal(false);
    return(
        <Box sx={{width:"100%",height:"100%", display:"flex", justifyContent:"center",alignItems:"center"}}>
            <Box sx={{'&:hover':{transform:"scale(1.05)"}, boxShadow: "0 4px 8px rgba(0, 0, 0, 0.9)",width:"40%", height:"60%",backgroundColor:"rgb(78, 1, 78)",borderRadius:"10px", display:"flex",flexDirection:"column",alignItems:"center",textAlign:"center"}}>
            <Box sx={{ width: "90%", height: "100%", display:"flex",flexDirection:"column", alignItems:"center"}}>
                <Typography variant="h5" sx={{ margin: "2vh 0", color: "white" }}>PREPARATION FLASHCARDS</Typography>
                <img style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)", width: "90%", height: "50%", borderRadius: "2%", margin:"0" }} src={quiz} alt="flashcard" />
                <Typography variant="h7" sx={{ margin: "1vh 0", color: "white", width:"100%" }}>create flashcards for students to learn</Typography>
                <Button sx={{ '&:hover':{backgroundColor:"#DCDCDC"},boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)", color: "black", backgroundColor: "white", padding: "1vh 8vh", marginTop: "2.5vh" }} onClick={openFlashCardModal} variant="outlined">MAKE</Button>
        </Box>
            </Box>
            <Box sx={{boxShadow: "0 4px 8px rgba(0, 0, 0, 0.9)",width:"40%", height:"60%",borderRadius:"10px",backgroundColor:"rgb(78, 1, 78)", marginLeft:"5vh", display:"flex",flexDirection:"column",alignItems:"center",textAlign:"center",'&:hover': {transform: "scale(1.05)",
                            },}}>
                <Box sx={{width:"90%",  height: "100%", display:"flex",flexDirection:"column", alignItems:"center"}}>
                    <Typography variant="h5" sx={{ margin: "2vh 0", color: "white" }}>TESTS</Typography>
                    <img style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)", width: "90%", height: "50%", borderRadius: "2%" , margin:"0"}} src={tests} alt="flashcard" />
                    <Typography variant="h7" sx={{ margin: "1vh 0", color: "white",width:"100%" }}>create a test to check student's knowledge</Typography>
                    <Button sx={{'&:hover':{backgroundColor:"#DCDCDC"},boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)",color:"black", backgroundColor:"white", padding:"1vh 8vh",marginTop:"2.5vh"}} onClick={openTestModal} variant="outlined">MAKE</Button>
                </Box>
            </Box>
            <AddFlashCardBoxModal openModal={openAddFlashCardModal} onCloseModal={closeAddFlashCardModal}/>
            <AddTest openModal={openAddTestModal} onCloseModal={closeAddTestModal}/>
        </Box>
        
    )

}