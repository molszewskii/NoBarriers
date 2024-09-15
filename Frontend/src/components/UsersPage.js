import React ,{useEffect, useState}from "react";
import './../css/userPage.css'
import Levels from "./LanguageGame/Levels";
import { useNavigate } from 'react-router-dom';
import puchar from './../assets/puchar.png'
import padlock from './../assets/padlock.jpg'
import { getUserData } from "../services/UserService";
import { Button, Box, ButtonGroup, Typography } from "@mui/material";
import LearningMaterials from "./Teacher/LearningMaterials";
import Reports from "./Teacher/Reports";
const UsersPage = () => {
    const [achievements, setAchievements]=useState([])
    const [levelsToUlockLeaderBoard,setLevelsToUlockLeaderBoard]=useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [openLearningMaterials, setOpenLearningMaterials]=useState(false);
    const [openReportAnswers, setOpenReportAnswers]=useState(false);
    const userRole = localStorage.getItem("userRole");
    const navigate = useNavigate();
    const handleNavigation=(name)=>{
        if(name === 'game'){
            navigate("/user")
        }else if(name === 'flashcards'){
            navigate("/flashcards");
        }else if(name === 'tests'){
            navigate("/tests");
        }else if(name === 'forum'){
            navigate("/forum");
        }
    }
    const buttons =[
        <Button className="buttonsMenu" name="game" sx={{mb:'10px',width:"90%"}} key="game" variant="outlined" onClick={(e)=>handleNavigation(e.currentTarget.getAttribute("name"))}>Game</Button>,
        <Button className="buttonsMenu" name="flashcards" sx={{mb:'10px',width:"90%"}} key="flashcards" variant="outlined" onClick={(e)=>handleNavigation(e.currentTarget.getAttribute("name"))}>FlashCards</Button>,
        <Button className="buttonsMenu" name="tests" sx={{mb:'10px',width:"90%"}} key="tests" variant="outlined" onClick={(e)=>handleNavigation(e.currentTarget.getAttribute("name"))}>Tests</Button>,
        <Button className="buttonsMenu" name="learningMaterials" sx={{mb:'10px',width:"90%"}} key="missions" variant="outlined" onClick={()=>setOpenLearningMaterials(true)}>Learning Materials</Button>,
        <Button className="buttonsMenu" name="forum" sx={{mb:'10px',width:"90%"}} key="forum" variant="outlined" onClick={(e)=>handleNavigation(e.currentTarget.getAttribute("name"))}>Forum</Button>,
        <Button className="buttonsMenu" name="reportAnswers" sx={{mb:'10px',width:"90%"}} key="reportAnswers" variant="outlined" onClick={()=>setOpenReportAnswers(true)}>Report Answers</Button>,
    ]
    useEffect(() => {
        const completedLevels = localStorage.getItem("levelIds");
        console.log(completedLevels);
      
        if (completedLevels) {
          const levelsToUnlock = 10 - completedLevels.length;
          setLevelsToUlockLeaderBoard(levelsToUnlock);
          setIsLoading(false);
        }
      }, []);
      useEffect(() => {
        const fetchData = async () => {
            const userData = getUserData();
            console.log(userData);

            if (achievements.length === 0) {
                try {
                    const response = await fetch(`https://localhost:7258/getUsersAchievements/${userData.userId}`);
                    const data = await response.json();

                    const simplifiedAchievements = data.map((achievement) => ({
                        progress: achievement.progress,
                        name: achievement.achievement.name,
                        maxValue: achievement.achievement.maxValue,
                    }));

                    setAchievements(simplifiedAchievements);
                    console.log(simplifiedAchievements);
                } catch (error) {
                    console.error("Błąd podczas pobierania danych:", error);
                } finally {
                    setIsLoading(false);
                }
            }
        };

        fetchData();
    }, []);
    
    if (isLoading) {
        return <p>Loading...</p>;
    }
    return(
        <div>            
            {(openLearningMaterials || openReportAnswers) ?(
                <>
                <Typography sx={{marginLeft:"3vh",marginTop:"2vh"}} onClick={()=>(openLearningMaterials ? setOpenLearningMaterials(false) : setOpenReportAnswers(false))}>X</Typography>
                {openLearningMaterials ? (
                    <LearningMaterials />
                ):(
                    <Reports userRole={userRole}/>
                )}
                </>
                
            ):(
            <div className="mainView">
                <div className="side">
                    <Box sx={{border:"1px solid black",width: "41vh",height: "50vh",marginTop: "5vh",marginLeft: "5vh",borderRadius: "15px",padding: "5vh",textAlign:"center"}}>
                        <h3 style={{color:"black", margin:"0", marginBottom:"2vh",fontSize:"4vh"}}>Achievements</h3>
                        <Box className="achievements">
                            <Box sx={{borderBottom:"1px solid lightgray"}}>
                                {achievements.map((achievement, index) => (
                                    <div key={index} className="boxMission" style={{borderBottom:"1px solid lightgray"}}>
                                        <p key={achievement.name}>{achievement.name}</p>
                                        <div className="progressBar">
                                            <div className="progress" style={{ width: `${(achievement.progress / achievement.maxValue) * 100}%` }} />
                                        </div>
                                        <p style={{textAlign:"center"}}>{`${achievement.progress}/${achievement.maxValue} pts`}</p>
                                    </div>
                                ))}
                            </Box>
                        </Box>
                        
                        
                    </Box>
                    <Box sx={{border:"1px solid black",width: "47vh",height: "15vh",marginTop: "3vh",marginLeft: "5vh",borderRadius: "15px",padding: "2vh",textAlign:"start"}}>
                        <h4 style={{color:"black",fontSize:"4vh"}}>Unlock the Leaderboard</h4>
                        <Box sx={{display:"flex"}}>
                            <img src={padlock} alt="padlock" style={{width:"60px",height:"60px",marginLeft:"1vh",marginTop:"1vh"}}></img>
                            <p style={{color:"darkgray"}}>Complete {levelsToUlockLeaderBoard} lessons to unlock</p>
                        </Box>
                        
                    </Box>
                </div>
                <div className="main">
                    <Levels />
                </div>
                <div className="userSide">
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection:'column',
                        justifyContent:"center",
                        alignItems:"center",
                        marginTop:"3vh",
                        '& > *': {
                        m: 1,
                        },
                        width:'100%',
                        height:'auto'
                        }
                    }
                    >
                {buttons}
                </Box>
            </div>
            </div>
            )}
        </div>
    );


}

export default UsersPage;