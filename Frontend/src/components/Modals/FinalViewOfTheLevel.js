import { Box, Button, Modal, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addProgress } from "../../services/UserService";
import {addNewCompletedLevel} from "../../services/UserService"
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
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
const FinalViewOfTheLevel=({openModal,level})=>{
    const [open, setOpen] = useState(false);
    const userId = localStorage.getItem("userId");
    const handleClose = () =>{
        setOpen(false);
    } 
    const navigate = useNavigate();
    useEffect(()=>{
        setOpen(openModal)
    },[])
    
    const navigateBackToGame = async () => {
      try {
        const achievements = [
          { name: "Earn 100 points", maxValue: 100 },
          { name: "Earn 200 points", maxValue: 200 },
          { name: "Earn 300 points", maxValue: 300 },
          { name: "Earn 400 points", maxValue: 400 },
        ];
    
        const addAchievementPromises = achievements.map(async (achievement) => {
          try {
            const response = await addProgress(userId, 10, achievement.name, achievement.maxValue);
            console.log(response.data);
          } catch (error) {
            console.error("Błąd podczas dodawania postępu:", error);
          }
        });
    
        await Promise.all(addAchievementPromises);
    
        await addNewCompletedLevel(userId, level).then((response) => console.log(response)).catch((error) => console.error("Błąd podczas dodawania ukończonego poziomu:", error));
        setTimeout(() => {
          localStorage.removeItem(`progress_${level}`);
          localStorage.removeItem(`nextView_${level}`);
          localStorage.removeItem(`data_${level}`);
          localStorage.removeItem(`newdata_${level}`);
          localStorage.removeItem(`loaded_${level}`);
        }, 0);
        navigate("/user");
      } catch (error) {
        console.error("Błąd podczas operacji:", error);
      }
    };
    return (
      <Box>
        <Modal
          open={open}
          onClose={handleClose}
            >
          <Box sx={style}>
            <Typography  variant="h6" component="h2">
              Congratulations !!!
            </Typography>
            <Typography  sx={{ mt: 2 }}>
              You have completed level {level}.
            </Typography>
            <Button onClick={navigateBackToGame} sx={{marginTop:"2vh"}} variant="outlined">Love it</Button>
          </Box>
        </Modal>
      </Box>
    );
}

export default FinalViewOfTheLevel;