import { Box, Button,} from "@mui/material";
import React, { useState } from "react";
import { CreateResources } from "./CreateResources";
import { ShowCreatedResources } from "./ShowCreatedResources";
import Statistics from "./Statistics";
import LearningMaterials from "./LearningMaterials";
import Forum from "./Forum";
import Reports from "./Reports";
const TeacherPage=()=>{
    const buttons = ['Create Resources','Show Created Resources', 'Test Results', 'Reports', 'Learning Materials', 'Forum' ]
    const userRole = localStorage.getItem("userRole");
    const [resourcesClicked,setResourcesClicked]=useState(false)
    const [showCreatedResourcesClicked,setShowCreatedResourcesClicked]=useState(false)
    const [statisticsClicked,setStatisticsClicked]=useState(false);
    const [learningMaterialsClicked,setLearningMaterialsClicked]=useState(false);
    const [forumClicked,setForumClicked]=useState(false);
    const [reportsClicked,setReportsClicked]=useState(false);
    const handleButtonClick=(name)=>{
        setResourcesClicked(name === "Create Resources");
        setShowCreatedResourcesClicked(name === "Show Created Resources");
        setStatisticsClicked(name === 'Test Results')
        setLearningMaterialsClicked(name === 'Learning Materials')
        setReportsClicked(name === 'Reports')
        setForumClicked(name === 'Forum')

    }

    
    return(
        <Box sx={{width:"100%",height:"90vh",display:"flex",backgroundColor:"#1E1E1E"}}>
            <Box sx={{ width: "15%", height: "93%", backgroundColor: "#1E1E1E", display: "flex", flexDirection: "column", padding: "20px 0"}}>
                {buttons.map((name, index) => (
                    <Button
                    key={index}
                    onClick={() => handleButtonClick(name)}
                    sx={{
                        borderBottom: "1px solid #333333",
                        height: "10vh",
                        color: "white",
                        backgroundColor: resourcesClicked && name === "Create Resources" ? "#555555" : showCreatedResourcesClicked && name === "Show Created Resources" ? "#555555" : "transparent",
                        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                        margin: "10px 0",
                        borderRadius: "8px",
                        '& span':{width:"100%"},
                        '&:hover': {
                        backgroundColor: resourcesClicked && name === "Create Resources" ? "#555555" : showCreatedResourcesClicked && name === "Show Created Resources" ? "#555555" : "#333333",
                        },
                    }}
                    >
                    {name}
                    </Button>
                ))}
            </Box>

            <Box sx={{width:"85%", height:"100%", borderTopLeftRadius:"10px",borderBottomLeftRadius:"10px", backgroundColor:"white"}}>
                    {resourcesClicked && (
                        <CreateResources/>
                    )}
                    {showCreatedResourcesClicked && (
                        <ShowCreatedResources/>
                    )}
                    {statisticsClicked && (
                        <Statistics />
                    )}
                    {learningMaterialsClicked &&(
                        <LearningMaterials/>
                    )}
                    {forumClicked &&(
                        <Forum/>
                    )}
                    {reportsClicked &&(
                        <Reports userRole={userRole}/>
                    )}
            </Box>
           
        </Box>
    )
}

export default TeacherPage;